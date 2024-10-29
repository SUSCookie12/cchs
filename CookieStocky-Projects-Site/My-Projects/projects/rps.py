import random


def rock_paper_scissors():
    choices = ["rock", "paper", "scissors"]
    while True:
        player_choice = input("Enter rock, paper, or scissors (or 'quit' to exit): ")
        if player_choice == 'quit':
            break
        computer_choice = random.choice(choices)
        print(f"Computer chose: {computer_choice}")

        if player_choice == computer_choice:
            print("It's a tie!")
        elif (player_choice == "rock" and computer_choice == "scissors") or \
                (player_choice == "scissors" and computer_choice == "paper") or \
                (player_choice == "paper" and computer_choice == "rock"):
            print("You win!")
        else:
            print("You lose!")


rock_paper_scissors()