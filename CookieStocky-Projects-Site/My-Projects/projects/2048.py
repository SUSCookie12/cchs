import random

def start_game():
    mat = [[0]*4 for _ in range(4)]
    print("Welcome to 2048! The game will start with two random tiles.")
    mat = add_new(mat)
    mat = add_new(mat)
    return mat

def compress(mat):
    new_mat = [[0]*4 for _ in range(4)]
    changed = False
    for i in range(4):
        pos = 0
        for j in range(4):
            if mat[i][j] != 0:
                new_mat[i][pos] = mat[i][j]
                if j != pos:
                    changed = True
                pos += 1
    return new_mat, changed

def merge(mat):
    for i in range(4):
        for j in range(3):
            if mat[i][j] == mat[i][j+1] and mat[i][j] != 0:
                mat[i][j] *= 2
                mat [i][j+1] = 0
    return mat

def reverse(mat):
    new_mat = []
    for i in range(4):
        new_mat.append([])
        for j in range(4):
            new_mat[i].append(mat[i][3-j])
    return new_mat

def transpose(mat):
    new_mat = []
    for i in range(4):
        new_mat.append([])
        for j in range(4):
            new_mat[i].append(mat[j][i])
    return new_mat

def add_new(mat):
    r, c = random.randint(0, 3), random.randint(0, 3)
    while mat[r][c] != 0:
        r, c = random.randint(0, 3), random.randint(0, 3)
    mat[r][c] = random.randint(1, 2) * 2
    return mat

def check_empty_cells(mat):
    for i in range(4):
        for j in range(4):
            if mat[i][j] == 0:
                return True
    return False

def game_state(mat):
    for i in range(3):
        for j in range(3):
            if mat[i][j] == mat[i+1][j] or mat[i][j] == mat[i][j+1]:
                return 'GAME NOT OVER'
    for k in range(3):
        if mat[3][k] == mat[2][k] or mat[k][3] == mat[k][2]:
            return 'GAME NOT OVER'
    for i in range(4):
        for j in range(4):
            if mat[i][j] == 2048:
                return 'WON'
    return 'LOST'

def print_board(mat):
    for i in range(4):
        for j in range(4):
            print(f"{mat[i][j]: ^4}", end="")
        print()

def play_game():
    mat = start_game()
    while True:
        print_board(mat)
        x = input("Enter command (W/A/S/D): ")
        if x in ['W', 'w']:
            mat, changed1 = compress(mat)
            mat = merge(mat)
            changed2 = False
            if changed1:
                mat, changed2 = compress(mat)
            if changed2:
                mat = add_new(mat)
        elif x in ['S', 's']:
            mat = reverse(mat)
            mat, changed1 = compress(mat)
            mat = merge(mat)
            changed2 = False
            if changed1:
                mat, changed2 = compress(mat)
            mat = reverse(mat)
            if changed2:
                mat = add_new(mat)
        elif x in ['A', 'a']:
            mat = transpose(mat)
            mat, changed1 = compress(mat)
            mat = merge(mat)
            changed2 = False
            if changed1:
                mat, changed2 = compress(mat)
            mat = transpose(mat)
            if changed2:
                mat = add_new(mat)
        elif x in ['D', 'd']:
            mat = transpose(mat)
            mat = reverse(mat)
            mat, changed1 = compress(mat)
            mat = merge(mat)
            changed2 = False
            if changed1:
                mat, changed2 = compress(mat)
            mat = reverse(mat)
            mat = transpose(mat)
            if changed2:
                mat = add_new(mat)
        else:
            print("Invalid key pressed")
        game_status = game_state(mat)
        if game_status == 'WON':
            print("You won!")
            print_board(mat)
            break
        elif game_status == 'LOST':
            print("You lost!")
            print_board(mat)
            break

play_game()