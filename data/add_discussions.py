#this script adds course entries to the classes_for_prototype.csv file
#so that we can have some discussion sections in our test data

import random
import csv

courses_input = []

with open("classes_for_prototype.csv", "rU") as data:
    reader = csv.reader(data)
    for row in reader:
        #print(row)
        courses_input.append(row)

print(courses_input)

courses_output = []

# 0: IDENT_DIV	1: IDENT_SUFX_CD	2: xlisting	3: DEPARTMENT	4: CRS_TITLE	5: credit	
# 6: CRS_DESCRIPTION	7: FORMAT	8: FINALEXAMSTATUS	9: PREREQS	10: CR_RESTRICT	
# 11: AC	12: AL	13: BS	14: HS	15: IS	16: PV	17: PS	18: SS	19: RCA	20: RCB	21: pubHealthMaj 22: type

for item in courses_input:
    courses_output.append(item)
    if random.choice([1, 2, 3, 4, 5]) == 5:
        new = list(item)
        new[22] = "Discussion"
        courses_output.append(new)
        
with open("with_discussions.csv", "wb") as data:
    writer = csv.writer(data)
    writer.writerows(courses_output)