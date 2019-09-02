import random
print("\nRock, Paper, Scissors\n") #\n creates a new line

def playGame():
    listRPS = ["Rock", "Scissors", "Paper"]
    compChoice = random.randint(1, 3) #Randomly generated number between 1 and 3
    userChoice = 0 #Initializes userChoice
    
    while userChoice < 1 or userChoice > 3: #repeats until user gives valid answer
        userChoice = int(input("'1' for Rock; '2' for Scissors; '3' for Paper: "))
    print("Computer chose: %s" % listRPS[compChoice - 1])
    print() #just inserts a blank line
    tup = (listRPS[userChoice - 1], listRPS[compChoice - 1]) #tuple of actual string choice for print statements
    sub = userChoice - compChoice #most important piece of algorithm
    if sub == -1 or sub == 2:
        print("You won, %s beats %s" % tup)
        return 1
    elif sub == 0:
        print("Tie, %s is same as %s" % tup)
        return 0
    else:
        print("You lost, %s loses to %s" % tup)
        return 0
    #print("\nGame over")

winAmnt = 0
games = 0
while True: #plays game until user is finished
    games += 1
    num = playGame()
    winAmnt += num
    print("You've won %d out of %d games, or %.2f percent." % (winAmnt, games, (100 * float(winAmnt / games))))
    string = input("\nPlay again 'Y' or 'N': ")
    string = string.upper()
    if not(string == "Y" or string.upper() == "YES"):
        print("Game Done")
        break
    print()
        
