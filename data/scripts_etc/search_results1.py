#reads the courses.json file and outputs one file of results per search
#search 1: fall 2014 classes in the public health major
#search 2: all semesters L&S breadth reqs
#search 3: all semesters keyword "sustainability"
#search 4: fall 2014 MW before noon and anytime TuTh
#search 5: fall 2014 open seats

import json

all_courses = json.load(open('courses.json'))

courses_list = all_courses.items()
#for course in courses_list, course is a tuple and course[0] is the courseID from the old file  and course[1] is the dict of actual info

pub_health = []

for course in courses_list:
    #handle search 1
    if course[1]["pubHealthMaj"] and len(course[1]["classInstance"]) > 0:
        del course[1]["pubHealthMaj"]
        pub_health.append(course)
    

file = open("s1_pub_health.json", "w")
for course in pub_health:
    file.write('\"' + course[0] + '\":')
    file.write(json.dumps(course[1], sort_keys = True, indent = 4, ensure_ascii=False))
    file.write(", \n")
file.close()

