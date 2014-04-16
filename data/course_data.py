# needs to read in some course data from a spreadsheet

import csv 
import json
import random

courses_input = []

with open("classes_for_prototype.csv", "rU") as data:
    reader = csv.reader(data)
    for row in reader:
        #print(row)
        courses_input.append(row)

# insert into a dict that is the structure of CourseStructure.json
# append data that is not in spreadsheet that CourseStructure.json needs
# append class instance data in structure of CourseStructure.json
# use json.dumps to make json objects from dicts
# output to a file depending on what search it's the results for

#for appending data that we don't have
# use functions that assign value based on random number generation

#have:
#   "title": "This is a course title",
#   "department": "Department",
#   "deptAbbrev": "Dept Abbrev",
#   "number": "101",
#   "crossListing": "one cross listed class, another cross listed class",
#   "credit": 3,
#   "description": "This is a course description. Lorem ipsum dolor sit amet.",
#   "format": "Three hours of lecture and etc etc.",
#   "prereqs": "Department 1A or consent of instructor.",
#   "note": "These are the notes that are necessary to include.",
#   "restrictions": "These are the course restrictions",
# pubHealthMaj flag set to true for that results set <--THIS WILL NOT BE USED IN THE FINAL OUTPUT
#   "breadth": {
#      "AC": true,
#      "RCA": true,
#      "RCB": true,
#      "BS": true,
#      "HS": true,
#      "IS": true,
#      "PV": true,
#      "PS": true,
#      "SBS": true
#      },


# need:
#   "offerHist": ["Spring 2013", "Spring 2011"],

#   "classInstance": {
#      "classTitle": "Lecture",
#      "semester": "Fall 2014",
#      "days": ["M", "W", "F"],
#      "time": "9-10 a.m.",
#      "room": "room number",
#      "building": "building name",
#      "instructor": "A. Professor, C. O'Instructor",
#      "ccn": 12345,
#      "seatLimit": 150,
#      "seatsEnrolled": 100,
#      "waitlist": 0,
#      "seatsAvail": 50,
#      "finalGroup": "This is when the final is",
#      },



#generate offering history
def gen_hist():
    semesters = [["Fall 2013", "Fall 2012", "Fall 2011", "Fall 2010"], ["Spring 2013", "Spring 2012", "Spring 2011", "Spring 2010"], ["Fall 2013", "Spring 2013", "Fall 2012", "Spring 2012"], ["Fall 2013", "Spring 2011", "Spring 2009"], ["Spring 2013", "Fall 2012", "Fall 2011", "Spring 2010"]]
    return random.choice(semesters)

def gen_sched():
    days = [["MWF"], ["MW"], ["TTh"], ["M"], ["F"]]
    times = ["8-9 a.m.", "9-10 a.m.", "10-11 a.m.", "11 a.m.-12 p.m.", "12-1 p.m.", "1-2 p.m.", "2-3 p.m.", "10-11:30 a.m.", "11:30 a.m.-1 p.m.", "1-2:30 p.m.", "2:30-4 p.m.", "3-4:30 p.m.", "4-5:30 p.m.", "4:30-6 p.m."]
    sched = []
    sched.append(random.choice(days))
    sched.append(random.choice(times))
    return sched
    


courses_output = []

# order of source file is: 
# 0: IDENT_DIV	1: IDENT_SUFX_CD	2: xlisting	3: DEPARTMENT	4: CRS_TITLE	5: credit	
# 6: CRS_DESCRIPTION	7: FORMAT	8: FINALEXAMSTATUS	9: PREREQS	10: CR_RESTRICT	
# 11: AC	12: AL	13: BS	14: HS	15: IS	16: PV	17: PS	18: SS	19: RCA	20: RCB	21: pubHealthMaj

#have:
#   "title": "This is a course title",
#   "department": "Department",
#   "minCredit": 3,
#   "maxCredit": 3,
#   "description": "This is a course description. Lorem ipsum dolor sit amet.",
#   "format": "Three hours of lecture and etc etc.",
#   "prereqs": "Department 1A or consent of instructor.",
#   "note": "These are the notes that are necessary to include.",
#   "restrictions": "These are the course restrictions",
# pubHealthMaj flag set to true for that results set
#   "breadth": {
#      "AC": true,
#      "RCA": true,
#      "RCB": true,
#      "BS": true,
#      "HS": true,
#      "IS": true,
#      "PV": true,
#      "PS": true,
#      "SBS": true
#      },

for item in courses_input:
    #print(item)
    course = {}
    #first populate the course data from the spreadsheet
    course["deptAbbrev"] = item[0]
    course["number"] = item[1]
    course["crossListing"] = item[2]
    course["department"] = item[3]
    course["title"] = item[4]
    course["credit"] = item[5]
    course["description"] = item[6]
    course["format"] = item[7]
    course["prereqs"] = item[9]
    course["restrictions"] = item[10]
    course["breadth"] = {"AC": item[11], "AL": item[12], "BS": item[13], "HS": item[14], "IS": item[15], "PV": item[16], "PS": item[17], "SS": item[18], "RCA": item[19], "RCB": item[20]}
    course["offerHist"] = gen_hist()
    #then course data that is not in the spreadsheet
    # dummy data just to append the same data to a selection:
#   "courseThread": "This class is part of the Sample McSampleton course thread.",
#   "berkeleyConnect": true,
#   "isPrereqFor": "This class is a prerequisite for Lorem Ipsum 151.",
#   "hasCoreqs": "Department 1A must be taken concurrently.",
    if random.choice([1, 2, 3, 4, 5]) == 5:
        course["courseThread"] = "This course is part of the Cultural Forms in Transit Course Thread."
    else:
        course["courseThread"] = ""
        
    if random.choice([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]) == 10:
        course["berkeleyConnect"] = True
    else: 
        course["berkeleyConnect"] = False
        
    if random.choice([1, 2, 3]) == 3:
        course["isPrereqFor"] = "This class is a prerequisite for " + item[0] + " 151."
    else:
        course["isPrereqFor"] = ""
        
    if random.choice([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]) == 15:
        course["hasCoreqs"] = item[0] + " 1A must be taken concurrently."
    
    #then populate the instance data
    course["classInstance"] = []
    #some need more than one instance, some need one, some need none
    
    courses_output.append(course)
    

#write the data to a text file
file = open("courses.json", "w")
for x in range(len(courses_output)):
    file.write('\"course' + str(x) + '\":')
    file.write(json.dumps(courses_output[x], sort_keys = True, indent = 4, ensure_ascii=False))
    file.write(", \n")

file.close()

