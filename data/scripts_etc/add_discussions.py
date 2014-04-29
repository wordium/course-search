#this script adds course entries to the classes_for_prototype.csv file
#so that we can have some discussion sections in our test data

import random
import csv

courses_input = []

with open("intermediate_data_file.csv", "rU") as data:
    reader = csv.reader(data)
    for row in reader:
        #print(row)
        courses_input.append(row)

#print(courses_input)

courses_output = []

# 0: IDENT_DIV	1: IDENT_SUFX_CD	2: xlisting	3: DEPARTMENT	4: CRS_TITLE	5: credit	
# 6: CRS_DESCRIPTION	7: FORMAT	8: FINALEXAMSTATUS	9: PREREQS	10: CR_RESTRICT	
# 11: AC	12: AL	13: BS	14: HS	15: IS	16: PV	17: PS	18: SS	19: RCA	20: RCB	21: pubHealthMaj 22: type

for item in courses_input:
    #choose which courses will have current instances
    if random.randint(0,1) == 1:
        item[23] = "Y"
        if random.randint(0, 3) == 3:
            item[24] = "Y"
    courses_output.append(item)
        
with open("courses_for_prototype.csv", "wb") as data:
    writer = csv.writer(data)
    writer.writerows(courses_output)