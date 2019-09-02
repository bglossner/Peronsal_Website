print("Base # Converter, max=16")

hex_dict = {0:0, 1:1, 2:2, 3:3, 4:4, 5:5, 6:6, 7:7, 8:8, 9:9,
            10:'A', 11:'B', 12:'C', 13:'D', 14:'E', 15:'F'}

def get_key(dic, value):
    return list(dic.keys())[(list(dic.values()).index(value))]

def to_b10(base, num_list):
    total = 0
    num_length = len(num_list)
    for index, i in enumerate(num_list):
        total += i * (base ** (num_length - 1 - index))
    return total

def b10_to(base, b10):
    base_list = []
    while b10 >= 1:
        base_list.insert(0, str(b10 % base))
        b10 = int(b10 / base)
    return base_list

def converter(b1, num, b2):
    list_b1 = [int(x) if x.isdigit() else int(get_key(hex_dict, x)) for x in num]
    if b1 != 10:
        new_num = to_b10(b1, list_b1)
    else:
        new_num = int(num)
    b4_b2_list = b10_to(b2, new_num)
    list_b2 = [str(hex_dict[int(i)]) for i in b4_b2_list]
    return "".join(list_b2)

while True:
    base1 = input("\n-----------\nBase given: ")
    try:
        base1 = int(base1)
    except ValueError:
        break
    num_b1 = input("Number in that base: ")
    print()
    base2 = int(input("Base wanted: "))
    print("\n{} in base{} is: {} in base{}".format(num_b1, base1, converter(base1, num_b1, base2), base2))
    
