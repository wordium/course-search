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
print(type(courses_list))
print(courses_list)
#for course in courses_list, course is a tuple and course[0] is the courseID from the old file  and course[1] is the dict of actual info

pub_health = []
breadth = []
sustain = []
schedule_1stpass = [] #this will be the first pass to get the right courses apart from the others
schedule_2ndpass = [] #this will be to remove the instances that don't fit the criteria

open_seats = []

for course in courses_list:
    #handle search 1
    if course[1]["pubHealthMaj"] and len(course[1]["classInstance"]) > 0:
        del course[1]["pubHealthMaj"]
        pub_health.append(course)
    
    #handle search 2
    if True in course[1]["breadth"].values():
        breadth.append(course)
    
    #handle search 3
    if "sustainability" in course[1]["description"]:
        sustain.append(course)
    
    #handle search 4 part 1--this harvests courses with instances that meet the search criteria (though they also have instances that don't included in the JSON object)
    #there are no classes that start in the a.m. and end after noon so just a.m. is fine for that too
    for item in course[1]["classInstance"]:
        if course not in schedule_1stpass:
            if ("M" in item["days"] or "W" in item["days"] and "F" not in item["days"]) and "a.m." in item["time"]:
                schedule_1stpass.append(course)
            if ("Tu" in item["days"] or "Th" in item["days"]):
                schedule_1stpass.append(course)

print(schedule_1stpass)

# for item in schedule_1stpass:
#     print("ITEM")
#     print(item)

#handle search 4 part 2--this removes the non-matching instances from the overall course objects
# for course in schedule_1stpass:
#     for item in course[1]["classInstance"]:
#         to_add = {}
#         if "F" in item["days"] or (("M" in item["days"] or "W" in item["days"])and "a.m." not in item["time"]):
#             course[1]["classInstance"].remove(item)
#             schedule_2ndpass[course]

# file = open("s1_pub_health.json", "w")
# for course in pub_health:
#     file.write('\"' + course[0] + '\":')
#     file.write(json.dumps(course[1], sort_keys = True, indent = 4, ensure_ascii=False))
#     file.write(", \n")
# file.close()
# 
# file = open("s2_breadth.json", "w")
# for course in breadth:
#     file.write('\"' + course[0] + '\":')
#     file.write(json.dumps(course[1], sort_keys = True, indent = 4, ensure_ascii=False))
#     file.write(", \n")
# file.close()
# 
# file = open("s3_sustain.json", "w")
# for course in sustain:
#     file.write('\"' + course[0] + '\":')
#     file.write(json.dumps(course[1], sort_keys = True, indent = 4, ensure_ascii=False))
#     file.write(", \n")
# file.close()

file = open("s4_schedule.json", "w")
for course in schedule_2ndpass:
    file.write('\"' + course[0] + '\":')
    file.write(json.dumps(course[1], sort_keys = True, indent = 4, ensure_ascii=False))
    file.write(", \n")
file.close()


