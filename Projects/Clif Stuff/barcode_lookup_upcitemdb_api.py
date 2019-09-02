from flask import Flask, request
import requests
from bs4 import BeautifulSoup
import re, json, difflib

app = Flask(__name__)

"""
    This class is to hold the top 3 or top 5 
    values (by DESC) in a list so you just
    have to call .add() and it will process it
    for you
"""
class HoldTopPercentTuples:

    """
        @Param:
            number_to_hold: Maximum number of elements to be stored in the list
    """
    def __init__(self, number_to_hold):
        self.top = [None for i in range(number_to_hold)]
        self.size = 0
        self.max_elements = number_to_hold

    """
        Shifts the list rightwards to accommodate an incoming value
        Meant to be a private function
    """
    def shift(self, shift_start):
        for i in reversed(range(shift_start, min(self.size + 1, self.max_elements - 1))):
            self.top[i + 1] = self.top[i]
    
    """
        Adds item to list IF it should be added,
        meaning it is one of the nunber_to_hold highest
        numbers

        @Params
            data: tuple in form (numerical_value, associated_data)
    """
    def add(self, data):
        key_index = None
        # Iterate through the elements in the list to see where new value should go
        for i in range(self.max_elements):
            # If the value in the list is None, just put it there
            if self.top[i] is None:
                self.shift(i)
                self.top[i] = data
                break
            # If the associated value is the same as the one in the list
            if data[1] == self.top[i][1]:
                # If the numerical value is greater, just replace it
                if data[0] > self.top[i][0]:
                    self.top[i] = data
                self.size -= 1
                break
            # If the numerical value is greater than the list's value, shift list at
            # spot and insert new value
            elif data[0] >= self.top[i][0]:
                # Gop through list and make sure associated data isn't after this one 
                for j in range(self.size - i):
                    # If it is, delete it
                    if self.top[self.size - j - 1][1] == data[1]:
                        del self.top[self.size - j - 1]
                        self.size -= 1
                        self.top.append([None])
                        break
                self.shift(i)
                self.top[i] = data
                break

        # Keep increasing the size until the list is full
        if self.size < self.max_elements:
            self.size += 1
    
"""
    Just removes any number-words from the string
"""
def remove_numbers_from_string(string):
    new_string = ""
    for word in string.split(" "):
        if not word.replace('.','',1).isdigit():
            new_string += word + " "
    return new_string[:-1]


"""
    Grabs the highest-percent same flavor, as well as the list containing the
    top 5 flavors based on percentages

    @Params:
        title_lists: list of titles from parsed JSON
        flavor_list: list of flavors from PowerApps.dbo.vw_GetUniqueFlavors
        company_to_remove1: reported company by the JSON
        company_to_remove2: guessed company from database
        domains: list of domains from JSON 
"""
def get_correct_flavor(title_lists, flavor_list, company_to_remove1, company_to_remove2, domains):
    high_percent = 0
    correct_flavor = ""
    top_flavors = HoldTopPercentTuples(5)

    for j, t_list in enumerate(title_lists):
        # Removes from titles the company names within them
        t_list = [ title.replace(company_to_remove1, "").replace(company_to_remove2, "") for title in t_list ]
        for item in t_list:
            for flavor in flavor_list:
                percent_same = difflib.SequenceMatcher(None, item, flavor).ratio()
                top_flavors.add((percent_same, flavor))
                if percent_same > high_percent:
                    high_percent = percent_same
                    # print("Found better flavor:", flavor, "vs", item, "at ratio:", str(percent_same), ". Domain:", domains[j])
                    correct_flavor = flavor
    
    return (correct_flavor, high_percent, top_flavors)


"""
    Grabs the highest-percent same product, as well as the list containing the
    top 5 products based on percentages

    @Params:
        title_lists: list of titles from parsed JSON
        product_list: list of flavors from PowerApps.dbo.vw_GetUniqueProducts
        flavor_gotten: best-guess flavor to remove from strings
        domains: list of domains from JSON 
"""
def get_correct_product(title_lists, product_list, flavor_gotten, domains):
    high_percent = 0
    correct_product = ""
    top_products = HoldTopPercentTuples(5)

    for j, t_list in enumerate(title_lists):
        for item in t_list:
            new_item = item
            for word in flavor_gotten.split(" "):
                new_item = new_item.replace(word, "")
            item = new_item
            for product in product_list:
                percent_same = difflib.SequenceMatcher(None, item, product).ratio()
                top_products.add((percent_same, product))
                if percent_same > high_percent:
                    high_percent = percent_same
                    #print("Found better product:", product, "vs", item, "at ratio:", str(percent_same), ". Domain:", domains[j])
                    correct_product = product

    return (correct_product, high_percent, top_products)

"""
    Grabs info from API and tries to get the best company, product, and flavor guesses

    CHANGE TXT FILE TO ACCESS THE SQL SERVER VIEWS INSTEAD 

    Return codes:
        -1 = error
        0 = No UPC found
"""
def parse_json_from_api(data):
    # These 3 all need to connect to their relevant vw_GetUnique...
    with open("products.txt", 'r') as prod_file:
        product_list = [p.rstrip() for p in prod_file.readlines()]
    with open("companies.txt", 'r') as comp_file:
        company_list = [p.rstrip() for p in comp_file.readlines()]
    with open("flavors.txt", 'r') as flavor_file:
        flavor_list = [p.rstrip() for p in flavor_file.readlines()]

    if data["code"] != "OK":
        return -1
    if data["total"] == 0:
        return 0
    item = data["items"][0]
    # Company from API
    main_title = item["title"]
    reported_company = item["brand"]
    high = 0
    correct_company = ""
    # Get best guess company
    for company in company_list:
        percent_same = difflib.SequenceMatcher(None, company, reported_company).ratio() 
        if percent_same > high:
            high = percent_same
            correct_company = company

    print("Got company:", correct_company, "at high", high)
    offers = item["offers"]
    titles = []
    domains = []
    # Go through and grab the different titles
    for offer in offers:
        title = remove_numbers_from_string(offer["title"])
        
        hyphen_count = title.count(" - ")
        comma_count = title.count(", ")
        assoc_list = title.split(" - ") if hyphen_count > comma_count else title.split(", ")
        i = 0
        while i < len(assoc_list):
            if i != 0  and "case of" in assoc_list[i].lower():
                assoc_list = assoc_list[:i]
                break
            i += 1
        
        titles.append(assoc_list)
        domains.append(offer["domain"])

    flavor_tuple = get_correct_flavor(titles, flavor_list, reported_company, correct_company, domains)
    product_tuple = get_correct_product(titles, product_list, flavor_tuple[0], domains)
        
    print("----------------------------------------------------")
    print("Got company:", correct_company)
    print("Got product:", product_tuple[0])
    print("Got flavor:", flavor_tuple[0])
    print()
    print("products:", product_tuple[2].top)
    print("flavors:", flavor_tuple[2].top)
    print("====================================================")

    return {
            "company" : correct_company,
            "products" : product_tuple[2].top,
            "flavors" : flavor_tuple[2].top 
        }


"""
    Calls API and gets JSON back
"""
def barcode_lookup_from_upc(upc):
    print('https://api.upcitemdb.com/prod/trial/lookup?upc=0' + upc)
    data_back = requests.get('https://api.upcitemdb.com/prod/trial/lookup?upc=0' + upc).json()
    return data_back

"""
    Flask stuff
"""
# ========================================================== #
@app.route("/")
def index():
    return '<p>hello</p>'

@app.route("/home")
def home():
    return '<p>HOME</p>'

@app.route("/lookup")
def barcode_lookup_from_request():
    barcode =  request.args.get('barcode')
    print("GOT BARCODE: " + barcode)
# ========================================================= #

"""
    This is called when you do 'py <name> ...'
"""
if __name__ == "__main__":
    import sys
    # If barcode given as command line argument, call the lookup
    # Used to get the JSON
    if len(sys.argv) == 2 and re.match(r'[0-9]{12,13}', sys.argv[1]) != None:
        if len(sys.argv[1]) == 12:
            print(barcode_lookup_from_upc("0" + sys.argv[1]))
        else:
            print(barcode_lookup_from_upc(sys.argv[1]))
    # 'py <name> -test' for testing the HoldTopPercentTuples class
    elif len(sys.argv) == 2 and sys.argv[1] == "-test":
        temp = HoldTopPercentTuples(8)
        temp.add((4, "hello"))
        temp.add((3, "hello2"))
        temp.add((2, "hello3"))
        temp.add((15, "hello4"))
        temp.add((4, "hello5"))
        temp.add((8, "hello5"))
        temp.add((7, "hello"))
        temp.add((10, "hello2"))
        print(temp.top)
    # Parses all the JSON files I've made
    else:
        print("\n\n")
        with open("json_cool_mint.txt", 'r') as f:
            parse_json_from_api(json.loads(f.read()))
        with open("json_whey_cocoalmchoc.txt", 'r') as f:
            parse_json_from_api(json.loads(f.read()))
        with open("json_naturepath_peanut.json", 'r') as f:
            parse_json_from_api(json.loads(f.read()))
        with open("json_luna_carwalbrownie.json", 'r') as f:
            parse_json_from_api(json.loads(f.read()))
        with open("json_nutbtrfilled_carchocpeanbut.json", 'r') as f:
            parse_json_from_api(json.loads(f.read()))
        with open("json_fruitsmofilled_strbryban.json", 'r') as f:
            parse_json_from_api(json.loads(f.read()))
        with open("json_lunaprtein_mintchocchip.json", 'r') as f:
            parse_json_from_api(json.loads(f.read()))
        print("\n\n")
        