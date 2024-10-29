import random

def hangman():
    words = ["python", "java", "hangman", "programming"]
    word = random.choice(words)
    guessed = "_" * len(word)
    attempts = 6

    while attempts > 0 and "_" in guessed:
        print(f"Word: {guessed}")
        guess = input("Guess a letter: ")[0]
        if guess in word:
            guessed = "".join([guess if word[i] == guess else guessed[i] for i in range(len(word))])
        else:
            attempts -= 1
            print(f"Wrong guess! Attempts left: {attempts}")

    if "_" not in guessed:
        print(f"Congratulations! You've guessed the word: {word}")
    else:
        print(f"Game over! The word was: {word}")

hangman()