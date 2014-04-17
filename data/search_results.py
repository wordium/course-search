#reads the courses.json file and outputs one file of results per search
#search 1: fall 2014 classes in the public health major
#search 2: all semesters L&S breadth reqs
#search 3: all semesters keyword "sustainability"
#search 4: fall 2014 MW before noon and anytime TuTh
#search 5: fall 2014 open seats

import json

all_courses = json.load(open('courses.json'))

# print(type(all_courses["course38"]))

courses_list = all_courses.items()
#for course in courses_list, course[0] is the courseID from the old file (prolly not needed here) and course[1] is the dict of actual info

pub_health = []
breadth = []
sustain = []
schedule = []
open_seats = []

for course in courses_list:
    if course[1]["pubHealthMaj"]:
        pub_health.append(course)

print(pub_health)
print(len(pub_health), "items")
