# -*- coding: utf-8 -*-
from graph_search import bfs, dfs
from be_metro import be_metro
from be_landmarks import be_landmarks
from landmark_choices_bern import landmark_choices

# Build your program below:

landmark_string = ''
for letter, landmark in landmark_choices.items():
    landmark_string += "{0} - {1}\n".format(letter, landmark)


stations_under_construction = [set(['Kocherpark', 'Eigerplatz'])]


def get_active_stations():
    updated_metro = be_metro
    for station_under_construction in stations_under_construction:
        for current_station in station_under_construction:
            print(current_station)
    """
            if current_station != station_under_construction:
                updated_metro[current_station] -= set(stations_under_construction)
            for value_name in current_station.items():
                print('blah')
                #print('key_name: ', key_name)
                print(value_name)
                print('blah')
    """


def greet():
    get_active_stations()
    print('Hi there and welcome to SkyRoute!')
    print("We'll help you find the shortest route between the following Vancouver landmarks:\n" + landmark_string)


def goodbye():
    print('Thanks for using SkyRoute!')


def skyroute():
    greet()
    new_route(None, None)
    goodbye()


def set_start_and_end(start_point, end_point):
    if start_point is not None:
        change_point = input("What would you like to change? You can enter 'o' for 'origin', 'd' for 'destination', or 'b' for 'both': ")
        if change_point == "b":
            start_point = get_start()
            end_point = get_end()
        elif change_point == "o":
            start_point = get_start()
        elif change_point == "d":
            end_point = get_end()
        else:
            print("Oops, that isn't 'o', 'd', or 'b'...")
            start_point, end_point = set_start_and_end(None, None)
    else:
        start_point = get_start()
        end_point = get_end()

    return start_point, end_point


def get_start():
    start_point_letter = input("Where are you coming from? Type in the corresponding letter: ")
    if start_point_letter in landmark_choices:
        start_point = landmark_choices[start_point_letter]
        return start_point
    else:
        print("Sorry, that's not a landmark we have data on. Let's try this again...")
        get_start()


def get_end():
    end_point_letter = input("Ok, where are you headed? Type in the corresponding letter: ")
    if end_point_letter in landmark_choices:
        end_point = landmark_choices[end_point_letter]
        return end_point
    else:
        print("Sorry, that's not a landmark we have data on. Let's try this again...")
        get_end()


def show_landmarks():
    see_landmarks = input("Would you like to see the list of landmarks again? Enter y/n: ")
    if see_landmarks == 'y':
        print("We'll help you find the shortest route between the following Vancouver landmarks:\n" + landmark_string)


def new_route(start_point, end_point):
    start_point, end_point = set_start_and_end(start_point, end_point)
    print('from: ', start_point)
    print('to: ', end_point)
    shortest_route = get_route(start_point, end_point)
    if shortest_route:
        shortest_route_string = '\n'.join(shortest_route)
        print("The shortest metro route from {0} to {1} is:\n{2}".format(start_point, end_point, shortest_route_string))
    else:
        print("unfortunately, there is currently no path between {0} and {1} due to maintenance.".format(start_point, end_point))
    again = input("Would you like to see another route? Enter y/n: ")
    if again == 'y':
        print('yess')
        show_landmarks()
        new_route(start_point, end_point)
    else:
        print('no thanks')


def get_route(start_point, end_point):
    start_stations = be_landmarks[start_point]
    end_stations = be_landmarks[end_point]
    routes = []

    for start_station in start_stations:
        for end_station in end_stations:
            route = bfs(be_metro, start_station, end_station)
            if route:
                routes.append(route)

    # print(routes)
    shortest_route = min(routes, key=len)

    return shortest_route


skyroute()

# print(get_route('Canada Place', 'Burnaby Lake'))
