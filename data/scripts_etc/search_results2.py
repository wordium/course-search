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

breadth = []

for course in courses_list:
    #handle search 2
    if True in course[1]["breadth"].values():
        del course[1]["pubHealthMaj"]
        breadth.append(course)
    
file = open("s2_breadth.json", "w")
for course in breadth:
    file.write('\"' + course[0] + '\":')
    file.write(json.dumps(course[1], sort_keys = True, indent = 4, ensure_ascii=False))
    file.write(", \n")
file.close()
