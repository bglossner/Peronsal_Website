print("Pascal's Triangle")

def triangle_list(num):
    if num > 0:
        if num > 2:
            tri_dict = {1:[1], 2:[1, 1]}
            for i in range(3, num + 1):
                tri_dict[i] = [1]
                for l in range(i - 2):
                    tri_dict[i].append(tri_dict[i - 1][l] + tri_dict[i - 1][l + 1])
                tri_dict[i].append(1)
            return tri_dict
        else:
            return tri_dict
    else:
        return "Can't sorry"

from functools import reduce

def print_largest(l):
    print("Max number: " + str(max(l)))

def print_triangle(tri_dict):
    #max_num_l = [len(str(i)) for i in tri_dict[len(tri_dict.keys())]]
    #max_num = reduce((lambda x, y: x + y), max_num_l)
    #print(max_num)
    max_num = len(tri_dict[len(tri_dict.keys())])
    for i in tri_dict.keys():
        print(center_line(tri_dict[i], max_num, i))
    print()
    print_largest(tri_dict[len(tri_dict)])

def center_line(line, max_num, line_num):
    if len(line) == 1:
        return (" " * int((max_num - line_num))) + "1" + (" " * int((max_num - line_num)))
    else:
        temp_str = str(line[0])
        for i in range(1, len(line)):
            temp_str += " " + str(line[i])
        space_str = " " * int(max_num - line_num)
        temp_str = space_str + temp_str + space_str
        return temp_str

print_triangle(triangle_list(int(input("Enter Num: "))))
