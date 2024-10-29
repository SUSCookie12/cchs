def print_board(board):
    for row in board:
        print(" | ".join(row))
        print("-" * 5)


def tic_tac_toe():
    board = [[" " for _ in range(3)] for _ in range(3)]
    current_player = "X"

    for _ in range(9):
        print_board(board)
        row = int(input(f"Player {current_player}, enter row (0-2): "))
        col = int(input(f"Player {current_player}, enter col (0-2): "))

        if board[row][col] == " ":
            board[row][col] = current_player
            if any(all(cell == current_player for cell in row) for row in board) or \
                    any(all(board[r][c] == current_player for r in range(3)) for c in range(3)) or \
                    all(board[i][i] == current_player for i in range(3)) or \
                    all(board[i][2 - i] == current_player for i in range(3)):
                print_board(board)
                print(f"Player {current_player} wins!")
                return
            current_player = "O" if current_player == "X" else "X"
        else:
            print("Cell already taken! Try again.")

    print_board(board)
    print("It's a tie!")


tic_tac_toe()