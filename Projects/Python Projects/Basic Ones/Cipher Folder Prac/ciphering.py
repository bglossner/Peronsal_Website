def make_cipher(string):
    newStr = ""
    for i, char in enumerate(string):
        newStr += chr((ord(char) + shift[i % 10]) % 128)
    return newStr

def reverse_cipher(string):
    newStr = ""
    for i, char in enumerate(string):
        newStr += chr(((ord(char) - shift[i % 10]) + 128) % 128)
    return newStr

shift = [74, 132, 96, 21, 0, 251, 8, 123, 186, 222]
f = input("File Name: ")
with open(f, "r") as file:
    r_b4 = file.read()
    choice = input("Encrypt or Decrypt: ")
    if choice.lower() == "encrypt":
        r_after = make_cipher(r_b4)
        print(f[f.rfind("/") + 1:] + " has been encrypted!")
    else:
        r_after = reverse_cipher(r_b4)
        print(f[f.rfind("/") + 1:] + " has been decrypted!")

with open(f, "w") as file:
    file.write(r_after)
