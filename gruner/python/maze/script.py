from random import randint

print('hello felix')


def build_maze(m, n, swag):
    grid = []
    for i in range(m):
        row = []
        for j in range(n):
            row.append("wall")
        grid.append(row)
    return grid


def print_maze(grid):
    for row in build_maze(5, 10, grid):
        printable_row = ''
        for cell in row:
            if cell == 'wall':
                char = '|'
            else:
                char = ' '
            printable_row += char
        print(printable_row)
    # print(build_maze(5, 10, grid))


print_maze(None)

"""
"""
