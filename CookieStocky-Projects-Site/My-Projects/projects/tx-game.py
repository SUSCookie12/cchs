def start_game():
    print("Welcome to the adventure game!")
    print("You are standing at the entrance of a dark cave.")
    print("There is a path to your left and a path to your right.")
    print("Which path do you choose?")

    choice = input("> ")

    if choice.lower() == "left":
        bear_room()
    elif choice.lower() == "right":
        cthulhu_room()
    else:
        dead("You stumble around the cave until you starve.")

def bear_room():
    print("There's a bear here.")
    print("The bear has a bunch of honey.")
    print("The fat bear is in front of another door.")
    print("How are you going to move the bear?")
    bear_moved = False

    while True:
        choice = input("> ")

        if choice.lower() == "take honey":
            dead("The bear looks at you then slaps your face off.")
        elif choice.lower() == "taunt bear" and not bear_moved:
            print("The bear has moved from the door. You can go through it now.")
            bear_moved = True
        elif choice.lower() == "taunt bear" and bear_moved:
            dead("The bear gets pissed off and chews your leg off.")
        elif choice.lower() == "open door" and bear_moved:
            gold_room()
        else:
            print("I got no idea what that means.")

def gold_room():
    print("This room is full of gold. How much do you take?")

    choice = input("> ")
    if "0" in choice or "1" in choice:
        how_much = int(choice)
    else:
        dead("Man, learn to type a number.")

    if how_much < 50:
        print("Nice, you're not greedy, you win!")
        exit(0)
    else:
        dead("You greedy bastard!")

def cthulhu_room():
    print("Here you see the great evil Cthulhu.")
    print("He, it, whatever stares at you and you go insane.")
    print("Do you flee for your life or eat your head?")

    choice = input("> ")

    if "flee" in choice:
        start_game()
    elif "head" in choice:
        dead("Well that was tasty!")
    else:
        cthulhu_room()

def dead(why):
    print(why, "Good job!")
    exit(0)

start_game()