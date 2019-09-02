#This version of the game does 3 things differently: it allows the user to inputy a word, it allows the user to just guess the entire word, and it fills in any spaces for the user.

# Hangman Game
#
# The classic game of Hangman.  The computer picks a random word
# and the player wrong to guess it, one letter at a time.  If the player
# can't guess the word in time, the little stick figure gets hanged.

# imports
import random
import time
from threading import Timer
timerAmnt = 5
##print(sys.path)
##import Image
##img1 = Image.open("hangman.jpg")
##img1.show()
# The Hangman List that draws the hang man when guesses are wrong
HANGMAN = [
"""
 ------
 |    |
 |
 |
 |
 |
 |
 |
 |
----------
""",
"""
 ------
 |    |
 |    O
 |
 |
 |
 |
 |
 |
----------
""",
"""
 ------
 |    |
 |    O
 |   -+-
 | 
 |   
 |   
 |   
 |   
----------
""",
"""
 ------
 |    |
 |    O
 |  /-+-
 |   
 |   
 |   
 |   
 |   
----------
""",
"""
 ------
 |    |
 |    O
 |  /-+-/
 |   
 |   
 |   
 |   
 |   
----------
""",
"""
 ------
 |    |
 |    O
 |  /-+-/
 |    |
 |   
 |   
 |   
 |   
----------
""",
"""
 ------
 |    |
 |    O
 |  /-+-/
 |    |
 |    |
 |   | 
 |   | 
 |   
----------
""",
"""
 ------
 |    |
 |    O
 |  /-+-/
 |    |
 |    |
 |   | |
 |   | |
 |  
----------
"""]

MAX_WRONG = len(HANGMAN) - 1
words = ["python", "paleolithic", "samaritan", "xylophone", "sturgeon"] #words to guess -- enter your own words here
WORDS = list(map(lambda x: x.upper(), words))
# initialize variables
word = random.choice(WORDS)   # the word to be guessed     # one dash for each letter in word to be guessed
wrong = 0                     # number of wrong guesses player has made
used = []                     # letters already guessed


print("Welcome to Hangman.    Good luck!") #opening statement
print("Please guess a word associated with your class and project.") #topic clue
#print("HINT:  The word is", ____________ , " letters long.") #clues user to word length
string = str(input("Do you want to enter a word? "))
if(string == "yes" or "y"):
    newWord = input("Wanted word: ")
    word = newWord.upper()
so_far = "-" * len(word)
#space_list = list(filter(lambda x: word[x] == " ", range(len(word))))
#so_far = [so_far[i] if i not in space_list else " " for i in range(len(so_far))]
so_far = "".join(["-" if i != " " else " " for i in word])

for i in range(0, 20):
    print("\n")

while wrong < MAX_WRONG and so_far != word:
    print(HANGMAN[wrong])
    print("\nYou've used the following letters:\n", used)
    print("\nSo far, the word is:\n", so_far)
    #timer = Timer(timeout, , )
    guess = input("\n\nEnter your guess: ")  #tell user to guess a word
    guess = guess.upper()

    print("a")
    
    while guess in used:
        print("You've already guessed the letter", guess)
        guess = input("Enter your guess: ")
        guess = guess.upper()

    used.append(guess)

    if guess in word and len(guess) == 1:
        new = ""
        for i in range(len(word)):
            if guess == word[i]:
                new += guess
            else:
                new += so_far[i]
        so_far = new
        if so_far == word:
            print("\nYes!", guess, "is in the word!  YOU WIN!  ")
    elif guess == word:
        break
    else:
        print("\nSorry,", guess, "isn't in the word.")
        wrong += 1

if wrong == MAX_WRONG:
    print(HANGMAN[wrong])
    print("\nYou've been hanged!")
else:
    print("\nYou guessed it!")
    
print("\nThe word was", word)

input("\n\nPress the enter key to exit.")
