# needs to read in some course data from a spreadsheet

import csv 
import json
import random

courses_input = []

with open("courses_for_prototype.csv", "rU") as data:
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

#make string to boolean function b/c of stupid Excel behavior
def make_bool(s):
        return json.loads(s.lower())

#generate offering history
def gen_hist():
    semesters = [["Fall 2013", "Fall 2012", "Fall 2011", "Fall 2010"], ["Spring 2013", "Spring 2012", "Spring 2011", "Spring 2010"], ["Fall 2013", "Spring 2013", "Fall 2012", "Spring 2012"], ["Fall 2013", "Spring 2011", "Spring 2009"], ["Spring 2013", "Fall 2012", "Fall 2011", "Spring 2010"]]
    return random.choice(semesters)

#gen schedule based on whether it's a lecture or a discussion
def gen_sched(type):
    sched = []
    if type == "Lecture":
        days = ["MWF", "MW", "TuTh", "M", "F"]
        times = [{"start": "8A", "end": "9A"}, {"start": "9A", "end": "10A"}, {"start": "10A", "end": "11A"}, {"start": "11A", "end": "12P"}, {"start": "12P", "end": "1P"}, {"start": "1P", "end": "2P"}, {"start": "2P", "end": "3P"}, {"start": "10A", "end": "11:30A"}, {"start": "11:30A", "end": "1P"}, {"start": "1P", "end": "2:30P"}, {"start": "2:30P", "end": "4P"}, {"start": "3P", "end": "4:30P"}, {"start": "4P", "end": "5:30P"}, {"start": "4:30P", "end": "6P"}]
    else: 
        days = ["M", "Tu", "W", "Th", "F"]
        times = [{"start": "8A", "end": "9A"}, {"start": "9A", "end": "10A"}, {"start": "10A", "end": "11A"}, {"start": "11A", "end": "12P"}, {"start": "12P", "end": "1P"}, {"start": "1P", "end": "2P"}, {"start": "2P", "end": "3P"}, {"start": "3P", "end": "4P"}, {"start": "4P", "end": "5P"}, {"start": "5P", "end": "6P"}]
    sched.append(random.choice(days))
    sched.append(random.choice(times))
    return sched

#generate seat info based on whether it's a lecture or a discussion
def gen_seats(type):
    seats = {}
    if type == "Lecture":
        seatlimit = random.choice([30, 40, 50, 100, 150, 250, 500, 700])
    else:
        seatlimit = random.choice([10, 12, 15, 20, 25])
    seatstaken = random.randint(0, seatlimit)
    seats = {"max": seatlimit, "enrolled": seatstaken, "waitlist": random.choice([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 0, 10]), "available": seatlimit - seatstaken} 
    return seats

#generate one instance of a course, with variables of whether it has a final and whether should be a lecture or discussion instance     
def gen_instance(instanceType, finalstatus):
    instance = {"instanceType": instanceType} #populate instancetype
    if finalstatus == "Y":
        instance["finalGroup"] = random.choice(["Group 1--Monday, December 15, 2014, 1 p.m.", "Group 2--Tuesday, December 16, 2014, 9 a.m.", "Group 3--Wednesday, December 17, 2014, 12 p.m.", "Group 4--Thursday, December 18, 2014, 3 p.m.", "Group 5--Friday, December 15, 2014, 1 p.m."])
    else: 
        instance["finalGroup"] = "Not applicable"
    instance["semester"] = "Fall 2014"
    sched = gen_sched(instanceType)
    instance["days"] = sched[0]
    instance["time"] = sched[1]
    instance["location"] = {"room": random.randint(1, 299), "building": random.choice(["Evans", "Barrows", "Dwinelle", "Wheeler", "Soda", "Wurster"])}
    instance["instructor"] = random.choice(["I. Jaskolski", "M. Wetterman", "O. Bandyopadhyay", "B. Varela", "S. Abdullah", "G. Burke", "W. Hopkins, M. Anson", "M. Sarka", "C. Giorgano", "A. Kennard", "M. Mhasalkar, U. Jehlicka", "C. Marquez", "V. Benbow, Z. Alberts", "D. Matousek, C. Stoddard", "K. Serafini, M. Ferrero"])
    instance["ccn"] = random.randint(10000, 99999)
    instance["seats"] = gen_seats(instanceType)
    return instance
    
courses_output = []

# order of source file is: 
# 0: IDENT_DIV  1: IDENT_SUFX_CD    2: xlisting 3: DEPARTMENT   4: CRS_TITLE    5: credit   
# 6: CRS_DESCRIPTION    7: FORMAT   8: FINALEXAMSTATUS  9: PREREQS  10: CR_RESTRICT 
# 11: AC    12: AL  13: BS  14: HS  15: IS  16: PV  17: PS  18: SS  19: RCA 20: RCB 21: pubHealthMaj

for item in courses_input:
    #skip header row
    if item == courses_input[0]:
        pass
    else:
        course = {}
        #first populate the course data from the spreadsheet
        course["deptAbbrev"] = item[0]
        course["number"] = item[1]
        course["crossListing"] = item[2]
        course["department"] = item[3]
        course["title"] = item[4]
        course["credit"] = int(item[5])
        course["description"] = item[6]
        course["format"] = item[7]
        course["prereqs"] = item[9]
        course["restrictions"] = item[10]
        course["breadth"] = {"AC": make_bool(item[11]), "AL": make_bool(item[12]), "BS": make_bool(item[13]), "HS": make_bool(item[14]), "IS": make_bool(item[15]), "PV": make_bool(item[16]), "PS": make_bool(item[17]), "SS": make_bool(item[18]), "RCA": make_bool(item[19]), "RCB": make_bool(item[20])}
        course["offerHist"] = gen_hist()
        course["courseType"] = item[22]
        course["pubHealthMaj"] = make_bool(item[21])

        #then course data that is not in the spreadsheet
        # dummy data just to append the same data to a selection:
        if random.randint(1, 15) == 15:
            course["courseThread"] = "This course is part of the Cultural Forms in Transit Course Thread."
        else:
            course["courseThread"] = ""

        if random.randint(1, 10) == 10:
            course["berkeleyConnect"] = True
        else: 
            course["berkeleyConnect"] = False

        if random.randint(1, 3) == 3:
            course["isPrereqFor"] = item[0] + " 151"
        else:
            course["isPrereqFor"] = ""

        if random.randint(1, 15) == 15:
            course["hasCoreqs"] = item[0] + " 1A"
        else:
            course["hasCoreqs"] = ""
        if random.randint(1, 10) == 10:
            course["note"] = "This is a note."
        else:
            course["note"] = ""
        if random.randint(1, 8) == 8:
            course["freshSophSem"] = True
        else:
            course["freshSophSem"] = False

        #then populate the instance data if it's supposed to have any
        instances = []
        #give one instance for all that need it
        if item[23] == "Y":
            instances.append(gen_instance("Lecture", item[8]))
            #for lectures, populate more than one for some subset
            if random.randint(1, 10) == 10:
                instances.append(gen_instance("Lecture", item[8]))
                #for lectures that need discussions, make some of those
            if item[24] == "Y":
                for x in range(random.randint(2, 5)):
                    instances.append(gen_instance("Discussion", "N"))

        course["classInstance"] = instances
        courses_output.append(course)

    

#write the data to a text file

# file = open("courses.json", "w")
# file.write(json.dumps(courses_output))
# file.close()


file = open("courses.json", "w")
for x in range(len(courses_output)):
    file.write('\"course' + str(x) + '\":')
    file.write(json.dumps(courses_output[x], sort_keys = True, indent = 4, ensure_ascii=False))
    file.write(", \n")

file.close()



