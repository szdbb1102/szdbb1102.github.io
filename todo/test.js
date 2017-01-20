var arr  = "4.57 s326 ms1.24 s10.69 s10.85 s1.64 s10.67 s608 ms3.30 s 2.86 s353 ms373 ms2.09 s467 ms1.06 s749 ms352 ms373 ms";
arr=arr.replace(' ','');

IF(ISNUMBER(FIND("ms",F36)),-LOOKUP(,-MIDB(F36,SEARCHB("?",F36),ROW($1:$7))),-LOOKUP(,-MIDB(F36,SEARCHB("?",F36),ROW($1:$7)))*1000)