import random
def getCoord(num):
    myDic = {1: (1, 1),
             2: (1, 2),
             3: (1, 3),
             4: (2, 1),
             5: (2, 2),
             6: (2, 3),
             7: (3, 1),
             8: (3, 2),
             9: (3, 3)
        }
    return myDic[num]
board = {}
def initBoard():
    for i in range(1, 10):
        board[i] = "-"
initBoard()

def printBoard():
    print()    
    for i in range(1, 4):
        for l in range(1, 4):
            print(board[(i-1) * 3 + l], end="  ")
        print()
        
def hasWon(row, col):
    num = (row - 1) * 3 + col
    char = board[num]
    for i in range(1, 4):
        tempChar = board[(row - 1) * 3 + i]
        if tempChar == "-":
            break
        elif tempChar == char:
            if i == 3:
                return True
        else:
            break
    
    for i in range(1, 4):
        tempChar = board[(i - 1) * 3 + col]
        if tempChar == "-":
            break
        elif tempChar == char:
            if i == 3:
                return True
        else:
            break
    
    if num % 2 == 1:
        if board[num] == board[1] and board[9] == board[5] and board[5] != "-":
            return True
        elif board[num] == board[5] and board[5] == board[7] and board[7] != "-":
            return True
        
    return False

def printHelp():
    for i in range(1, 4):
        for l in range(1, 4):
            print((i-1) * 3 + l, end="  ")
        print()

print("Welcome to Tic-Tac-Toe\n")
print("User goes first")
printHelp()
printBoard()
turnStr = "x"
while True:
    num = int(input("Input number (1-9) for %s turn: " % turnStr))
    uRow, uCol = getCoord(num)[0], getCoord(num)[1]
    while board[(uRow - 1) * 3 + uCol] != "-":
        uRow = int(input("Select row (1-3): "))
        uCol = int(input("Select column (1-3): "))
    board[((uRow-1) * 3) + uCol] = turnStr
    printBoard()
    if hasWon(uRow, uCol):
        print("Game Done")
        break
    if "-" not in board.values():
        print("Tie")
        break
    turnStr = "o" if turnStr == "x" else "x"
