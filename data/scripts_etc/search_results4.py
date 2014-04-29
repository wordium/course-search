#reads the courses.json file and outputs one file of results per search
#search 1: fall 2014 classes in the public health major
#search 2: all semesters L&S breadth reqs
#search 3: all semesters keyword "sustainability"
#search 4: fall 2014 MW before 12:30 PM and anytime TuTh
#search 5: fall 2014 open seats

import json

all_courses = json.load(open('courses.json'))

courses_list = all_courses.items()
#for course in courses_list, course is a tuple and course[0] is the courseID from the old file  and course[1] is the dict of actual info

schedule_1stpass = [] #this will be the first pass to get the right courses apart from the others
schedule_2ndpass = [] #this will be to remove the instances that don't fit the criteria
schedule_3rdpass = []
schedule_4thpass = []

for course in courses_list:
    del course[1]["pubHealthMaj"]

    #handle search 4 part 1--this harvests courses with instances that meet the search criteria (though they also have instances that don't included in the JSON object)
    #there are no classes that start in the a.m. and end after noon so just a.m. is fine for that too
    for item in course[1]["classInstance"]:
        if course not in schedule_1stpass:
            if ((("M" in item["days"] or "W" in item["days"]) and "F" not in item["days"]) and (("A" in item["time"]["end"] or "12P" in item["time"]["end"]) or ("Tu" in item["days"] or "Th" in item["days"]))):
                schedule_1stpass.append(course)


#handle search 4 part 2--removing individual class instances from courses that have other instances that fit the criteria
for course in schedule_1stpass:
    for item in course[1]["classInstance"]:
        if ("F" in item["days"]):
            course[1]["classInstance"].remove(item)
        elif ("M" in item["days"] or "W" in item["days"]) and ("A" not in item["time"]["end"]):
            if item["time"]["end"] != "12P":
                course[1]["classInstance"].remove(item)
    schedule_2ndpass.append(course)
    
    
for course in schedule_2ndpass:
    for item in course[1]["classInstance"]:
        if ("F" in item["days"]):
            course[1]["classInstance"].remove(item)
        elif ("M" in item["days"] or "W" in item["days"]) and ("A" not in item["time"]["end"]):
            if item["time"]["end"] != "12P":
                course[1]["classInstance"].remove(item)
    schedule_3rdpass.append(course)

file = open("s4_schedule_3rdpass.json", "w")

for course in schedule_3rdpass:
    for item in course[1]["classInstance"]:
        if ("F" in item["days"]):
            course[1]["classInstance"].remove(item)
        elif ("M" in item["days"] or "W" in item["days"]) and ("A" not in item["time"]["end"]):
            if item["time"]["end"] != "12P":
                course[1]["classInstance"].remove(item)
    schedule_4thpass.append(course)

file = open("s4_schedule.json", "w")
for course in schedule_4thpass:
    file.write('\"' + course[0] + '\":')
    file.write(json.dumps(course[1], sort_keys = True, indent = 4, ensure_ascii=False))
    file.write(", \n")
file.close()
