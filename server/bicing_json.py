#!/usr/bin/env python
# -*- coding: UTF-8 -*-
from geojson import Feature, Point, FeatureCollection
from shapely.geometry  import  Point,mapping
import json
import requests
import psycopg2
from time import gmtime, strftime
import sys
# enable debugging
import cgitb
cgitb.enable()

print "Content-Type: text/plain;charset=utf-8"
print


#connexio a la base de dades
try:
    conn = psycopg2.connect("dbname='bicing' user='postgres' host='localhost' password='postgres'")
except:
    print "I am unable to connect to the database"

#cursor.execute("select row_to_json(t) from (select id, lat from bicing) t;")

cursor = conn.cursor()
cursor.execute("select lat,lon, extract(epoch from hora),ABS(bikesdifference) from bicing where ABS(bikesdifference) !=0")
rows = cursor.fetchall()
gjson_dict = {}
gjson_dict["type"] = "FeatureCollection"
feat_list = []

for row in rows:
    type_dict = {}
    pt_dict = {}
    prop_dict = {}

    type_dict["type"] = "Feature"

    pt_dict["type"] = "Point"

    type_dict["geometry"] = mapping(Point(row[1],row[0]))

    prop_dict["hora"] = row[2]
    prop_dict["bikes"] = row[3]

    type_dict["properties"] = prop_dict

    feat_list.append(type_dict)

gjson_dict["features"] = feat_list


print json.dumps(gjson_dict)


#features = []
#for row in rows:
#    features.append(Feature(geometry=Point((row))))




#def bdTojson():
#    geojson = {'type':'FeatureCollection','features':[]}
#    for row in rows():
#        feature = {'type':'Feature',
#                    'properties':{},
#                    'geometry':{'type':'Point',
#                                'coordinates':[]}}





#featurecollection from sql
#cursor.execute("SELECT jsonb_build_object('type','FeatureCollection','features', jsonb_agg(feature))FROM (SELECT jsonb_build_object('type','Feature','id', id,'geometry', ST_AsGeoJSON(geom)::jsonb,'properties', to_jsonb(row) - 'gid' - 'geom') AS feature FROM (SELECT * FROM bicing) row) features;")
#rows = cursor.fetchall()
#print json.dumps(rows)
