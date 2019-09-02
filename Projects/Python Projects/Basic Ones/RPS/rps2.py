import random
userInput = input("Choose rock, paper, or scissors: ")
choose = random.choice(["rock","paper","scissors"])
print(choose)
def dorock():
    if choose == "scissors":
        print("You win!")
    else:
        print("You Lose")
def doscissors():
    if choose == "paper":
        print("You win!")
    else:
        print("You Lose")
def dopaper():
    if choose == "rock":
        print("You win")
    else:
        print("You lose")

if userInput == choose:
    print("Tie!")
else:
    (eval("do" + userInput))()
