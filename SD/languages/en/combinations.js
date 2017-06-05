	var combinations = [
		// *** 4 params begin ***
		{
			// alarm + e a | duration - | date + s | time + s a
			regExp: /(?:(#prep_\d+%|#before_\d+%).{0,3})?(#date_\d+%)(?:.{0,25}(#prep_\d+%).{0,3}|.{0,25})(#time_\d+%).{0,50}(#dtime_\d+%).{0,50}(#actionremind_\d+%).{0,5}(#rtime_\d+%)/gmi,
			extract: function( tokens, match, text ) {
				var c = {
					"event_startDate" : tokens[ SD_tools._getNumber( match.match_items[ 1 ] ) ].func(),
					"event_startTime" : tokens[ SD_tools._getNumber( match.match_items[ 3 ] ) ].func(),
					"event_duration" :  SD_tools._durationCounter( tokens[ SD_tools._getNumber( match.match_items[ 4 ] ) ].func(), false, true ),
					"event_alarms" : tokens[ SD_tools._getNumber( match.match_items[ 6 ] ) ].func(),
					"event_result" : text,
					"priority" : 40 + tokens[ SD_tools._getNumber( match.match_items[ 1 ])].priority + tokens[ SD_tools._getNumber( match.match_items[ 3 ])].priority + tokens[ SD_tools._getNumber( match.match_items[ 4 ])].priority + tokens[ SD_tools._getNumber( match.match_items[ 6 ])].priority
				};
				return c;
			},
			id : 'c0'
		},
		{
			// alarm - | duration + a | date + s a | time + a  date in number in duration
			regExp: /(?:(#prep_\d+%).{0,5})?(#date_\d+%).+?(#prep_\d+%|#from_\d+%).{0,3}(#number_\d+%).+(#to_\d+%).{0,3}(#number_\d+%).{0,50}(#actionremind_\d+%).{0,5}(#rtime_\d+%)/gmi,
			extract: function( tokens, match, text ) {
				if ( tokens[ SD_tools._getNumber( match.match_items[ 3 ] ) ].func() > 23 ) return;
				return {
					"event_startTime" : { h : tokens[ SD_tools._getNumber( match.match_items[ 3 ] ) ].func(), m : 0 },
					"event_startDate" : tokens[ SD_tools._getNumber( match.match_items[ 1 ] ) ].func(),
					"event_duration" :  SD_tools._durationCounter( +tokens[ SD_tools._getNumber( match.match_items[ 3 ] ) ].func(), +tokens[ SD_tools._getNumber( match.match_items[ 5 ] ) ].func() ),
					"event_alarms" : tokens[ SD_tools._getNumber( match.match_items[ 7 ] ) ].func(),
					"event_result" : text,
					"priority" : 35 + tokens[ SD_tools._getNumber( match.match_items[ 1 ])].priority + tokens[ SD_tools._getNumber( match.match_items[ 7 ])].priority
				};
			},
			id : 'c1'
		},
		{
			// alarm + e | duration + a | date + | time + a from to duration
			regExp: /(?:(#prep_\d+%).{0,5})?(#date_\d+%).+?(#from_\d+%).{0,3}(#number_\d+%).{0,3}(#to_\d+%).{0,3}(#time_\d+%).+?(#actionremind_\d+%).{0,5}(#rtime_\d+%)/gmi,
			extract: function( tokens, match, text ) {
				if ( tokens[ SD_tools._getNumber( match.match_items[ 1 ] ) ].func().length > 23 ) return;
				return {
					"event_startDate" : tokens[ SD_tools._getNumber( match.match_items[ 1 ] ) ].func(),
					"event_startTime" : { h : tokens[ SD_tools._getNumber( match.match_items[ 3 ] ) ].func() , m : 0 },
					"event_alarms" : tokens[ SD_tools._getNumber( match.match_items[ 7 ] ) ].func(),
					"event_duration" : SD_tools._durationCounter( +tokens[ SD_tools._getNumber( match.match_items[ 3 ] ) ].func(), tokens[ SD_tools._getNumber( match.match_items[ 5 ] ) ].func() ),
					"event_result" : text,
					"priority" : 28 + tokens[ SD_tools._getNumber( match.match_items[ 1 ])].priority + tokens[ SD_tools._getNumber( match.match_items[ 5 ])].priority + tokens[ SD_tools._getNumber( match.match_items[ 7 ])].priority
				};
			},
			id : 'c2'
		},
		{
			// alarm + | duration + s | date + s | time + s from to duration
			regExp: /(?:(#prep_\d+%).{0,5})?(#date_\d+%)(?:.+(#prep_\d+%).{0,3}|.{0,5})(#time_\d+%).{0,3}[-].{0,3}(#time_\d+%).+?(#actionremind_\d+%).{0,5}(#rtime_\d+%)/gmi,
			extract: function( tokens, match, text ) {
				return {
					"event_startDate" : tokens[ SD_tools._getNumber( match.match_items[ 1 ] ) ].func(),
					"event_startTime" : tokens[ SD_tools._getNumber( match.match_items[ 3 ] ) ].func(),
					"event_alarms" : tokens[ SD_tools._getNumber( match.match_items[ 6 ] ) ].func(),
					"event_duration" :  SD_tools._durationCounter( tokens[ SD_tools._getNumber( match.match_items[ 3 ] ) ].func(), tokens[ SD_tools._getNumber( match.match_items[ 4 ] ) ].func() ),
					"event_result" : text,
					"priority" : 40 + tokens[ SD_tools._getNumber( match.match_items[ 3 ])].priority + tokens[ SD_tools._getNumber( match.match_items[ 4 ])].priority + tokens[ SD_tools._getNumber( match.match_items[ 6 ])].priority
				};
			},
			id : 'c3'
		},
		// *** 4 params end***
		// *** 3 params ***
		{// "+" - attends, "-" - absents, "e" - exact, "r" - relative, "a" - advanced features, "s" - standard format
			// alarm + e a | duration - | date + s | time + s a
			regExp: /(?:(#prep_\d+%).{0,3})?(#time_\d+%).{0,25}(#date_\d+%).{0,25}(#actionremind_\d+%).{0,5}(#rtime_\d+%)/gmi,
			extract: function( tokens, match, text ) {
				var c = {
					"event_startDate" : tokens[ SD_tools._getNumber( match.match_items[ 2 ] ) ].func(),
					"event_startTime" : tokens[ SD_tools._getNumber( match.match_items[ 1 ] ) ].func(),
					"event_alarms" : tokens[ SD_tools._getNumber( match.match_items[ 4 ] )].func(),
					"event_result" : text,
					"priority" : 30 + tokens[ SD_tools._getNumber( match.match_items[ 1 ])].priority + tokens[ SD_tools._getNumber( match.match_items[ 2 ])].priority + tokens[ SD_tools._getNumber( match.match_items[ 4 ])].priority
				};
				return c;
			},
			id : 'c4'
		},
		{
			// alarm + | duration - | date + s a | time + s a hours/mins in night
			regExp: /(?:(#prep_\d+%).{0,3})?(#date_\d+%)(?:.+?(#prep_\d+%).{0,3}|.{0,5})(#time_\d+%).+?(#actionremind_\d+%).{0,5}(#rtime_\d+%)/gmi,
			extract: function( tokens, match, text ) {
				return {
					"event_startDate" : tokens[ SD_tools._getNumber( match.match_items[ 1 ] ) ].func(),
					"event_startTime" : tokens[ SD_tools._getNumber( match.match_items[ 3 ] ) ].func(),
					"event_alarms" : tokens[ SD_tools._getNumber( match.match_items[ 5 ] ) ].func(),
					"event_result" : text,
					"priority" : 30 + tokens[ SD_tools._getNumber( match.match_items[ 1 ])].priority + tokens[ SD_tools._getNumber( match.match_items[ 3 ])].priority + tokens[ SD_tools._getNumber( match.match_items[ 5 ])].priority
				};
			},
			id : 'c4a'
		},
		{
			// alarm + e a | duration - | date + s | time + s a
			regExp: /(?:(#prep_\d+%|#before_\d+%).{0,3})?(#date_\d+%)(?:.{0,25}(#prep_\d+%).{0,3}|.{0,25})(#time_\d+%).{0,25}(#actionremind_\d+%).{0,5}(#rtime_\d+%)/gmi,
			extract: function( tokens, match, text ) {
				var c = {
					"event_startDate" : tokens[ SD_tools._getNumber( match.match_items[ 1 ] ) ].func(),
					"event_startTime" : tokens[ SD_tools._getNumber( match.match_items[ 3 ] ) ].func(),
					"event_alarms" : tokens[ SD_tools._getNumber( match.match_items[ 5 ] ) ].func(),
					"event_result" : text,
					"priority" : 30 + tokens[ SD_tools._getNumber( match.match_items[ 1 ])].priority + tokens[ SD_tools._getNumber( match.match_items[ 3 ])].priority + tokens[ SD_tools._getNumber( match.match_items[ 5 ])].priority
				};
				return c;
			},
			id : 'c5'
		},
		{
			// alarm + e a | duration - | date + s | time + s a
			regExp: /(?:(#prep_\d+%|#before_\d+%).{0,3})?(#date_\d+%)(?:.{0,25}(#prep_\d+%).{0,3}|.{0,25})(#time_\d+%).+(#actionremind_\d+%).{0,5}(#rtime_\d+%)/gmi,
			extract: function( tokens, match, text ) {
				var c = {
					"event_startDate" : tokens[ SD_tools._getNumber( match.match_items[ 1 ] ) ].func(),
					"event_startTime" : tokens[ SD_tools._getNumber( match.match_items[ 3 ] ) ].func(),
					"event_alarms" : tokens[ SD_tools._getNumber( match.match_items[ 5 ] ) ].func(),
					"event_result" : text,
					"priority" : 30 + tokens[ SD_tools._getNumber( match.match_items[ 1 ])].priority + tokens[ SD_tools._getNumber( match.match_items[ 3 ])].priority + tokens[ SD_tools._getNumber( match.match_items[ 5 ])].priority
				};
				return c;
			},
			id : 'c6'
		},
		{
			// alarm + e | duration - | date + s | time + a action_remind
			regExp: /(?:(#prep_\d+%).{0,3})?(#date_\d+%).+?(#prep_\d+%).{0,3}(#number_\d+%).+(#actionremind_\d+%).{0,5}(#rtime_\d+%)/gmi,
			extract: function( tokens, match, text ) {
				if ( tokens[ SD_tools._getNumber( match.match_items[ 3 ] ) ].func() > 23 ) return;
				var k1 = 1, k2 = '', c = {
					"event_startDate" : tokens[ SD_tools._getNumber( match.match_items[ 1 ] ) ].func(),
					"event_startTime" : { h : tokens[ SD_tools._getNumber( match.match_items[ 3 ] ) ].func(), m : 0 },
					"event_alarms" : tokens[ SD_tools._getNumber( match.match_items[ 5 ] ) ].func(),
					"event_result" : text,
					"priority" : 30 + tokens[ SD_tools._getNumber( match.match_items[ 1 ])].priority + tokens[ SD_tools._getNumber( match.match_items[ 5 ])].priority
				};
				return c;
			},
			id : 'c7'
		},
		{
			// alarm - | duration + | date + s | time + a action_remind
			regExp: /(?:(#prep_\d+%).{0,3})?(#date_\d+%)(?:.+(#prep_\d+%).{0,3}|.{0,5})(#number_\d+%).{0,5}(#dtime_\d+%)/gmi,
			extract: function( tokens, match, text ) {
				if ( tokens[ SD_tools._getNumber( match.match_items[ 3 ] ) ].func() > 23 ) return;
				var k1 = 1, k2 = '', c = {
					"event_startDate" : tokens[ SD_tools._getNumber( match.match_items[ 1 ] ) ].func(),
					"event_startTime" : { h : tokens[ SD_tools._getNumber( match.match_items[ 3 ] ) ].func(), m : 0 },
					"event_duration" :  SD_tools._durationCounter( tokens[ SD_tools._getNumber( match.match_items[ 4 ] ) ].func(), false , true ),
					"event_result" : text,
					"priority" : 30 + tokens[ SD_tools._getNumber( match.match_items[ 1 ])].priority + tokens[ SD_tools._getNumber( match.match_items[ 4 ])].priority
				};
				return c;
			},
			id : 'c8'
		},
		/*{
			// alarm + e | duration - | date + s | time + a action_remind
			regExp: /(?:(#prep_\d+%).{0,3})?(#date_\d+%)(?:.+(#prep_\d+%).{0,3}|.{0,5})(#number_\d+%).+(#actionremind_\d+%).{0,5}(#rtime_\d+%)/gmi,
			extract: function( tokens, match, text ) {
				if ( tokens[ SD_tools._getNumber( match.match_items[ 3 ] ) ].func() > 23 ) return;
				var k1 = 1, k2 = '', c = {
					"event_startDate" : tokens[ SD_tools._getNumber( match.match_items[ 1 ] ) ].func(),
					"event_startTime" : { h : tokens[ SD_tools._getNumber( match.match_items[ 3 ] ) ].func(), m : 0 },
					"event_alarms" : tokens[ SD_tools._getNumber( match.match_items[ 5 ] ) ].func(),
					"event_result" : text,
					"priority" : 30 + tokens[ SD_tools._getNumber( match.match_items[ 1 ])].priority + tokens[ SD_tools._getNumber( match.match_items[ 5 ])].priority
				};
				return c;
			},
			id : 'c9'
		},*/
		{
			// alarm + | duration - | date + s a | time + s a   15го июня в 7-30
			regExp: /(?:(#prep_\d+%).{0,5})?(#date_\d+%)(?:.{0,25}?(#prep_\d+%).{0,5}|.{0,5})(#time_\d+%).{0,5}(#actionremind_\d+%)/gmi,
			extract: function( tokens, match, text ) {
				return {
					"event_startDate" : tokens[ SD_tools._getNumber( match.match_items[ 1 ] ) ].func(),
					"event_startTime" : tokens[ SD_tools._getNumber( match.match_items[ 3 ] ) ].func(),
					"event_alarms" : '0',
					"event_result" : text,
					"priority" : 30 + tokens[ SD_tools._getNumber( match.match_items[ 1 ])].priority + tokens[ SD_tools._getNumber( match.match_items[ 3 ])].priority
				};
			},
			id : 'c10'
		},
		{
			// alarm + | duration - | date + s a | time + a
			regExp: /(?:(#prep_\d+%).{0,3})?(#date_\d+%).+?(#prep_\d+%).{0,5}(#number_\d+%).+(#actionremind_\d+%)/gmi,
			extract: function( tokens, match, text ) {
				if ( tokens[ SD_tools._getNumber( match.match_items[ 3 ] ) ].func() > 23 ) return;
				return {
					"event_startDate" : tokens[ SD_tools._getNumber( match.match_items[ 1 ] ) ].func(),
					"event_startTime" : { h : +tokens[ SD_tools._getNumber( match.match_items[ 3 ] ) ].func(), m : 0 },
					"event_alarms" : '0',
					"event_result" : text,
					"priority" : 30 + tokens[ SD_tools._getNumber( match.match_items[ 1 ])].priority
				};
			},
			id : 'c11'
		},
		{
			// alarm + | duration - | date + s | time + a action_remind
			regExp: /(#actionremind_\d+%)(?:.+?(#prep_\d+%).{0,3}|.{0,5})(#date_\d+%)(?:.+?(#prep_\d+%).{0,3}|.{0,5})(#time_\d+%)/gmi,
			extract: function( tokens, match, text ) {
				return {
					"event_startDate" : tokens[ SD_tools._getNumber( match.match_items[ 2 ] ) ].func(),
					"event_startTime" : tokens[ SD_tools._getNumber( match.match_items[ 4 ] ) ].func(),
					"event_alarms" : '0',
					"event_result" : text,
					"priority" : 30 + tokens[ SD_tools._getNumber( match.match_items[ 2 ])].priority + tokens[ SD_tools._getNumber( match.match_items[ 4 ])].priority
				};
			},
			id : 'c12'
		},
		{
			// alarm + | duration - | date + s | time + a action_remind
			regExp: /(#actionremind_\d+%)(?:.+?(#prep_\d+%).{0,3}|.{0,5})(#date_\d+%)(?:.+?(#prep_\d+%).{0,3}|.{0,5})(#number_\d+%)/gmi,
			extract: function( tokens, match, text ) {
				if ( tokens[ SD_tools._getNumber( match.match_items[ 4 ] ) ].func() > 23 ) return;
				return {
					"event_startDate" : tokens[ SD_tools._getNumber( match.match_items[ 2 ] ) ].func() ,
					"event_startTime" : { h : tokens[ SD_tools._getNumber( match.match_items[ 4 ] ) ].func(), m : 0 },
					"event_alarms" : '0',
					"event_result" : text,
					"priority" : 30 + tokens[ SD_tools._getNumber( match.match_items[ 2 ])].priority
				};
			},
			id : 'c12'
		},
		{
			// alarm + e | duration + a | date - | time + a from to duration
			regExp: /(#from_\d+%).{0,3}(#time_\d+%).{0,3}(#to_\d+%).{0,3}(#time_\d+%).+(#actionremind_\d+%).{0,5}(#rtime_\d+%)/gmi,
			extract: function( tokens, match, text ) {
				if ( ( tokens[ SD_tools._getNumber( match.match_items[ 1 ] ) ].func().length > 23 ) && ( tokens[ SD_tools._getNumber( match.match_items[ 1 ] ) ].func().length > 23 ) ) return;
				var a2, c = {
					"event_startTime" : tokens[ SD_tools._getNumber( match.match_items[ 1 ] ) ].func(),
					"event_alarms" : tokens[ SD_tools._getNumber( match.match_items[ 5 ] ) ].func(),
					"event_duration" : SD_tools._durationCounter( tokens[ SD_tools._getNumber( match.match_items[ 1 ] ) ].func(), tokens[ SD_tools._getNumber( match.match_items[ 3 ] ) ].func() ),
					"event_result" : text,
					"priority" : 30 + tokens[ SD_tools._getNumber( match.match_items[ 1 ])].priority + tokens[ SD_tools._getNumber( match.match_items[ 3 ])].priority + + tokens[ SD_tools._getNumber( match.match_items[ 5 ])].priority
				};
				SD_tools._publicateQuery( {
					query : { date: true },
					callback : function( res ) {
						this.match = match;
						c.event_startDate = res.date;
						return c;
					}
				} )
			},
			id : 'c14'
		},
		{
			// alarm + e | duration + a | date - | time + a from to duration
			regExp: /(#from_\d+%).{0,3}(#number_\d+%).{0,3}(#to_\d+%).{0,3}(#time_\d+%).+?(#actionremind_\d+%).{0,5}(#rtime_\d+%)/gmi,
			extract: function( tokens, match, text ) {
				if ( tokens[ SD_tools._getNumber( match.match_items[ 1 ] ) ].func().length > 23 ) return;
				var a2, c = {
					"event_startTime" : { h : tokens[ SD_tools._getNumber( match.match_items[ 1 ] ) ].func() , m : 0 },
					"event_alarms" : tokens[ SD_tools._getNumber( match.match_items[ 5 ] ) ].func(),
					"event_duration" : SD_tools._durationCounter( +tokens[ SD_tools._getNumber( match.match_items[ 1 ] ) ].func(), tokens[ SD_tools._getNumber( match.match_items[ 3 ] ) ].func() ),
					"event_result" : text,
					"priority" : 28 + tokens[ SD_tools._getNumber( match.match_items[ 3 ])].priority + tokens[ SD_tools._getNumber( match.match_items[ 5 ])].priority
				};
				SD_tools._publicateQuery( {
					query : { date: true },
					callback : function( res ) {
						this.match = match;
						c.event_startDate = res.date;
						return c;
					}
				} )
			},
			id : 'c15'
		},
		{
			// alarm + e | duration + a | date - | time + a from to duration
			regExp: /(#from_\d+%).{0,3}(#number_\d+%).{0,3}(#to_\d+%).{0,3}(#time_\d+%).+(#actionremind_\d+%)/gmi,
			extract: function( tokens, match, text ) {
				if ( ( tokens[ SD_tools._getNumber( match.match_items[ 1 ] ) ].func().length > 23 ) && ( tokens[ SD_tools._getNumber( match.match_items[ 1 ] ) ].func().length > 23 ) ) return;
				var c = {
					"event_startTime" : { h : tokens[ SD_tools._getNumber( match.match_items[ 1 ] ) ].func() , m : 0 },
					"event_alarms" : '0',
					"event_duration" :  SD_tools._durationCounter( tokens[ SD_tools._getNumber( match.match_items[ 3 ] ) ].func(), +tokens[ SD_tools._getNumber( match.match_items[ 1 ] ) ].func() ),
					"event_result" : text,
					"priority" : 26 + tokens[ SD_tools._getNumber( match.match_items[ 3 ])].priority
				};
				SD_tools._publicateQuery( {
					query : { date: true },
					callback : function( res ) {
						this.match = match;
						c.event_startDate = res.date;
						return c;
					}
				} )
			},
			id : 'c16'
		},
		{//TODO smth's wrong here
			// alarm - | duration + s a | date + | time + s  from to duration
			regExp: /(#from_\d+%).{0,3}(#number_\d+%).{0,3}(#to_\d+%).{0,3}(#time_\d+%).+?(#date_\d+%)/gmi,
			extract: function( tokens, match, text ) {
				return {
					"event_startDate" : tokens[ SD_tools._getNumber( match.match_items[ 4 ] ) ].func(),
					"event_startTime" : { h : tokens[ SD_tools._getNumber( match.match_items[ 1 ] ) ].func() , m : 0 },
					"event_duration" : SD_tools._durationCounter( tokens[ +SD_tools._getNumber( match.match_items[ 1 ] ) ].func(), tokens[ SD_tools._getNumber( match.match_items[ 3 ] ) ].func() ),
					"event_result" : text,
					"priority" : 28 + tokens[ SD_tools._getNumber( match.match_items[ 3 ])].priority + tokens[ SD_tools._getNumber( match.match_items[ 4 ])].priority
				};
			},
			id : 'c16a'
		},
		{//TODO what is this? where is rtime?
			// alarm + | duration + a | date - | time + a from to duration
			regExp: /(#prep_\d+%|#from_\d+%).{0,3}(#time_\d+%).{0,3}(#prep_\d+%|#to_\d+%).{0,3}(#time_\d+%).+(#actionremind_\d+%)/gmi,
			extract: function( tokens, match, text ) {
				if ( ( tokens[ SD_tools._getNumber( match.match_items[ 1 ] ) ].func().length > 23 ) && ( tokens[ SD_tools._getNumber( match.match_items[ 1 ] ) ].func().length > 23 ) ) return;
				var a2, c = {
					"event_startTime" : +tokens[ SD_tools._getNumber( match.match_items[ 1 ] ) ].func(),
					"event_alarms" : "0",
					"event_duration" :  SD_tools._durationCounter( tokens[ SD_tools._getNumber( match.match_items[ 1 ] ) ].func(), tokens[ SD_tools._getNumber( match.match_items[ 3 ] ) ].func() ),
					"event_result" : text,
					"priority" : 30 + tokens[ SD_tools._getNumber( match.match_items[ 1 ])].priority
				};
				SD_tools._publicateQuery( {
					query : { date: true },
					callback : function( res ) {
						this.match = match;
						c.event_startDate = res.date;
						return c;
					}
				} )
			},
			id : 'c17'
		},
		{//TODO what is this? where is rtime?
			// alarm + | duration + a | date - | time + a from to duration
			regExp: /(#prep_\d+%).{0,3}(#time_\d+%).{0,3}(#dtime_\d+%).+(#actionremind_\d+%)/gmi,
			extract: function( tokens, match, text ) {
				var c = {
					"event_startTime" : +tokens[ SD_tools._getNumber( match.match_items[ 1 ] ) ].func(),
					"event_alarms" : "0",
					"event_duration" :  SD_tools._durationCounter( tokens[ SD_tools._getNumber( match.match_items[ 2 ] ) ].func(), false , true ),
					"event_result" : text,
					"priority" : 30 + tokens[ SD_tools._getNumber( match.match_items[ 1 ])].priority + tokens[ SD_tools._getNumber( match.match_items[ 2 ])].priority
				};
				SD_tools._publicateQuery( {
					query : { date: true },
					callback : function( res ) {
						this.match = match;
						c.event_startDate = res.date;
						return c;
					}
				} )
			},
			id : 'c18'
		},
		{
			// alarm - | duration + | date + s a | time + s a hours/mins in night
			regExp: /(?:(#prep_\d+%).{0,3})?(#date_\d+%)(?:.+(#prep_\d+%).{0,3}|.{0,5})(#time_\d+%).{0,50}(#dtime_\d+%)/gmi,
			extract: function( tokens, match, text ) {
				return {
					"event_startDate" : tokens[ SD_tools._getNumber( match.match_items[ 1 ] ) ].func(),
					"event_startTime" : tokens[ SD_tools._getNumber( match.match_items[ 3 ] ) ].func(),
					"event_duration" :  SD_tools._durationCounter( tokens[ SD_tools._getNumber( match.match_items[ 4 ] ) ].func(), false, true ),
					"event_result" : text,
					"priority" : 30 + tokens[ SD_tools._getNumber( match.match_items[ 1 ])].priority + tokens[ SD_tools._getNumber( match.match_items[ 3 ])].priority + tokens[ SD_tools._getNumber( match.match_items[ 4 ])].priority
				};
			},
			id : 'c19'
		},
		{
			// alarm - | duration + s | date + s | time + s from to duration
			regExp: /(?:(#prep_\d+%).{0,5})?(#date_\d+%).+?(#prep_\d+%|#from_\d+%).{0,3}(#time_\d+%).{0,3}(#to_\d+%).{0,3}(#time_\d+%)/gmi,
			extract: function( tokens, match, text ) {
				return {
					"event_startDate": tokens[ SD_tools._getNumber( match.match_items[ 1 ] ) ].func(),
					"event_startTime": tokens[ SD_tools._getNumber( match.match_items[ 3 ] ) ].func(),
					"event_duration" :  SD_tools._durationCounter( tokens[ SD_tools._getNumber( match.match_items[ 3 ] ) ].func(), tokens[ SD_tools._getNumber( match.match_items[ 5 ] ) ].func() ),
					"event_result": text,
					"priority" : 30 + tokens[ SD_tools._getNumber( match.match_items[ 1 ]) ].priority + tokens[ SD_tools._getNumber( match.match_items[ 3 ]) ].priority + tokens[ SD_tools._getNumber( match.match_items[ 5 ]) ].priority
				};
			},
			id : 'c20'
		},
		{
			// alarm - | duration + s | date + s | time + s from to duration
			regExp: /(?:(#prep_\d+%).{0,5})?(#date_\d+%)(?:.+(#prep_\d+%).{0,3}|.{0,5})(#time_\d+%).{0,3}[-].{0,3}(#time_\d+%)/gmi,
			extract: function( tokens, match, text ) {
				return {
					"event_startDate" : tokens[ SD_tools._getNumber( match.match_items[ 1 ] ) ].func(),
					"event_startTime" : tokens[ SD_tools._getNumber( match.match_items[ 3 ] ) ].func(),
					"event_duration" :  SD_tools._durationCounter( tokens[ SD_tools._getNumber( match.match_items[ 3 ] ) ].func(), tokens[ SD_tools._getNumber( match.match_items[ 4 ] ) ].func() ),
					"event_result" : text,
					"priority" : 31 + tokens[ SD_tools._getNumber( match.match_items[ 1 ])].priority + tokens[ SD_tools._getNumber( match.match_items[ 3 ])].priority + tokens[ SD_tools._getNumber( match.match_items[ 4 ])].priority
				};
			},
			id : 'c21'
		},
		{
			// alarm - | duration + s | date + s | time + s from to duration
			regExp: /(?:(#prep_\d+%).{0,5})?(#date_\d+%)(?:.+(#prep_\d+%).{0,3}|.{0,5})(#number_\d+%).{0,3}[-].{0,3}(#time_\d+%)/gmi,
			extract: function( tokens, match, text ) {
				return {
					"event_startDate" : tokens[ SD_tools._getNumber( match.match_items[ 1 ] ) ].func(),
					"event_startTime" : { h : tokens[ SD_tools._getNumber( match.match_items[ 3 ] ) ].func(), m : 0 },
					"event_duration" :  SD_tools._durationCounter( tokens[ SD_tools._getNumber( match.match_items[ 3 ] ) ].func(), tokens[ SD_tools._getNumber( match.match_items[ 4 ] ) ].func() ),
					"event_result" : text,
					"priority" : 26 + tokens[ SD_tools._getNumber( match.match_items[ 1 ] ) ].priority + tokens[ SD_tools._getNumber( match.match_items[ 4 ] ) ].priority
				};
			},
			id : 'c22'
		},
		{
			// alarm - | duration + s | date + s | time + s from to duration
			regExp: /(?:(#prep_\d+%).{0,5})?(#date_\d+%)(?:.+(#prep_\d+%).{0,3}|.{0,5})(#time_\d+%).{0,3}[-].{0,3}(#number_\d+%)/gmi,
			extract: function( tokens, match, text ) {
				return {
					"event_startDate" : tokens[ SD_tools._getNumber( match.match_items[ 1 ] ) ].func(),
					"event_startTime" : tokens[ SD_tools._getNumber( match.match_items[ 3 ] ) ].func(),
					"event_duration" :  SD_tools._durationCounter( tokens[ SD_tools._getNumber( match.match_items[ 3 ] ) ].func(), tokens[ SD_tools._getNumber( match.match_items[ 4 ] ) ].func() ),
					"event_result" : text,
					"priority" : 26 + tokens[ SD_tools._getNumber( match.match_items[ 1 ] ) ].priority + tokens[ SD_tools._getNumber( match.match_items[ 3 ] ) ].priority
				};
			},
			id : 'c23'
		},
		{
			// alarm - | duration + a | date + s a | time + a  date in number in duration
			regExp: /(?:(#prep_\d+%).{0,5})?(#date_\d+%)(?:.+(#prep_\d+%).{0,3}|.{0,5})(#time_\d+%).{0,5}(#dtime_\d+%)/gmi,
			extract: function( tokens, match, text ) {
				return {
					"event_startTime" : tokens[ SD_tools._getNumber( match.match_items[ 3 ] ) ].func(),
					"event_startDate" : tokens[ SD_tools._getNumber( match.match_items[ 1 ] ) ].func(),
					"event_duration" :  SD_tools._durationCounter( tokens[ SD_tools._getNumber( match.match_items[ 4 ] ) ].func(), false , true ),
					"event_result" : text,
					"priority" : 30 + tokens[ SD_tools._getNumber( match.match_items[ 1 ])].priority + tokens[ SD_tools._getNumber( match.match_items[ 3 ])].priority + tokens[ SD_tools._getNumber( match.match_items[ 4 ])].priority
				};
			},
			id : 'c24'
		},
		{
			// alarm - | duration + a | date + s a | time + a  date in number in duration
			regExp: /(?:(#prep_\d+%).{0,5})?(#date_\d+%)(?:.{0,50}?(#prep_\d+%|#from_\d+%).{0,10}?|.+?)(#time_\d+%)(?:.{0,15}?(#prep_\d+%|#to_\d+%|[–-]).{0,10}?|.{0,3})(#time_\d+%)/gmi,
			extract: function( tokens, match, text ) {
				return {
					"event_startTime" : tokens[ SD_tools._getNumber( match.match_items[ 3 ] ) ].func(),
					"event_startDate" : tokens[ SD_tools._getNumber( match.match_items[ 1 ] ) ].func(),
					"event_duration" :  SD_tools._durationCounter( tokens[ SD_tools._getNumber( match.match_items[ 3 ] ) ].func(), tokens[ SD_tools._getNumber( match.match_items[ 5 ] ) ].func() ),
					"event_result" : text,
					"priority" : 35 + tokens[ SD_tools._getNumber( match.match_items[ 1 ])].priority + tokens[ SD_tools._getNumber( match.match_items[ 3 ])].priority
				};
			},
			id : 'c25'
		},
		{//TODO priority for durations + prep in duration combinations
			// alarm - | duration + a | date + s a | time + a  date in number in duration
			regExp: /(?:(#prep_\d+%).{0,5})?(#date_\d+%)(?:.+(#from_\d+%).{0,10}|.{0,5})(#time_\d+%).+?(#to_\d+%).{0,3}(#number_\d+%)/gmi,
			extract: function( tokens, match, text ) {
				return {
					"event_startTime" : tokens[ SD_tools._getNumber( match.match_items[ 3 ] ) ].func(),
					"event_startDate" : tokens[ SD_tools._getNumber( match.match_items[ 1 ] ) ].func(),
					"event_duration" : SD_tools._durationCounter( tokens[ SD_tools._getNumber( match.match_items[ 3 ] ) ].func(), +tokens[ SD_tools._getNumber( match.match_items[ 5 ] ) ].func() ),
					"event_result" : text,
					"priority" : 30 + tokens[ SD_tools._getNumber( match.match_items[ 1 ])].priority + tokens[ SD_tools._getNumber( match.match_items[ 3 ])].priority
				};
			},
			id : 'c26'
		},
		{
			// alarm - | duration + a | date + s a | time + a  date in number in duration
			regExp: /(?:(#prep_\d+%).{0,5})?(#date_\d+%).+?(#from_\d+%).{0,3}(#number_\d+%).+?(#to_\d+%).{0,3}(#time_\d+%)/gmi,
			extract: function( tokens, match, text ) {
				return {
					"event_startTime" : { h : +tokens[ SD_tools._getNumber( match.match_items[ 3 ] ) ].func(), m : 0 },
					"event_startDate" : tokens[ SD_tools._getNumber( match.match_items[ 1 ] ) ].func(),
					"event_duration" : SD_tools._durationCounter( +tokens[ SD_tools._getNumber( match.match_items[ 3 ] ) ].func(), tokens[ SD_tools._getNumber( match.match_items[ 5 ] ) ].func() ),
					"event_result" : text,
					"priority" : 30 + tokens[ SD_tools._getNumber( match.match_items[ 1 ])].priority + tokens[ SD_tools._getNumber( match.match_items[ 5 ])].priority
				};
			},
			id : 'c27'
		},
		{
			// alarm - | duration + a | date + s a | time + a  date in number in duration
			regExp: /(?:(#prep_\d+%).{0,5})?(#date_\d+%).+?(#prep_\d+%|#from_\d+%).{0,3}(#number_\d+%).+?(#to_\d+%).{0,3}(#number_\d+%)/gmi,
			extract: function( tokens, match, text ) {
				if ( tokens[ SD_tools._getNumber( match.match_items[ 3 ] ) ].func() > 23 ) return;
				return {
					"event_startTime" : { h : tokens[ SD_tools._getNumber( match.match_items[ 3 ] ) ].func(), m : 0 },
					"event_startDate" : tokens[ SD_tools._getNumber( match.match_items[ 1 ] ) ].func(),
					"event_duration" : SD_tools._durationCounter( +tokens[ SD_tools._getNumber( match.match_items[ 3 ] ) ].func(), tokens[ SD_tools._getNumber( match.match_items[ 5 ] ) ].func() ),
					"event_result" : text,
					"priority" : 25 + tokens[ SD_tools._getNumber( match.match_items[ 1 ])].priority
				};
			},
			id : 'c28'
		},
		{
			// alarm - | duration + a | date + s | time + a  from to duration
			regExp: /(#prep_\d+%|#from_\d+%).{0,3}(#number_\d+%).{0,3}(#prep_\d+%|#to_\d+%).{0,3}(#number_\d+%).+?(#prep_\d+%).{0,3}(#date_\d+%)/gmi,
			extract: function( tokens, match, text ) {
				if ( ( tokens[ SD_tools._getNumber( match.match_items[ 1 ] ) ].func().length > 23 ) && ( tokens[ SD_tools._getNumber( match.match_items[ 1 ] ) ].func().length > 23 ) ) return;
				var c = {
					"event_startDate" : tokens[ SD_tools._getNumber( match.match_items[ 5 ] ) ].func(),
					"event_startTime" : { h : tokens[ SD_tools._getNumber( match.match_items[ 1 ] ) ].func(), m : 0 },
					"event_duration" :  SD_tools._durationCounter( +tokens[ SD_tools._getNumber( match.match_items[ 1 ] ) ].func(), tokens[ SD_tools._getNumber( match.match_items[ 3 ] ) ].func() ),
					"event_result" : text,
					"priority" : 30 + tokens[ SD_tools._getNumber( match.match_items[ 5 ])].priority
				};
				return c;
			},
			id : 'c29'
		},
		{//
			// alarm - | duration + s a | date - | time + s  from to duration
			regExp: /(#from_\d+%).{0,3}(#number_\d+%).{0,3}(#to_\d+%).{0,3}(#number_\d+%).+(#actionremind_\d+%)/gmi,
			extract: function( tokens, match, text ) {
				var c = {
					"event_startTime" : { h : tokens[ SD_tools._getNumber( match.match_items[ 1 ] ) ].func(), m: 0 },
					"event_duration" : SD_tools._durationCounter( +tokens[ SD_tools._getNumber( match.match_items[ 1 ] ) ].func() , +tokens[ SD_tools._getNumber( match.match_items[ 3 ] ) ].func() ),
					"event_result" : text,
					"event_alarms" : "0",
					"priority" : 30
				};
				SD_tools._publicateQuery( {
					query: { date : true },
					callback : function( res ) {
						c.event_startDate = res.date;
						this.match = match;
						return c;
					}
				} );
			},
			id : 'c30'
		},
		/*{//TODO duration
			// alarm - | duration + a | date + | time + s a
			regExp: /(?:(#prep_\d+%).{0,3})?(#date_\d+%)(?:.{0,50}(#prep_\d+%).{0,3}|.{0,60}?)(#time_\d+%).+?(#to_\d+%).{0,3}(#time_\d+%)/gmi,
			extract: function( tokens, match, text ) {
				if ( tokens[ SD_tools._getNumber( match.match_items[ 1 ] ) ].func().length > 31 ) return;
				var c = {
					"event_startDate" : tokens[ SD_tools._getNumber( match.match_items[ 1 ] ) ].func(),
					"event_startTime" : tokens[ SD_tools._getNumber( match.match_items[ 3 ] ) ].func(),
					"event_duration" : SD_tools._durationCounter( tokens[ SD_tools._getNumber( match.match_items[ 3 ] ) ].func(), tokens[ SD_tools._getNumber( match.match_items[ 5 ] ) ].func() ),
					"event_result" : text,
					"priority" : 30 + tokens[ SD_tools._getNumber( match.match_items[ 1 ])].priority + tokens[ SD_tools._getNumber( match.match_items[ 3 ])].priority + tokens[ SD_tools._getNumber( match.match_items[ 5 ])].priority
				};
				return c;
			},
			id : 'c31'
		},*/
		{//TODO analyze for compl
			// alarm - | duration + | date + s | time + date from to duration ?wtf
			regExp: /(?:(#prep_\d+%).{0,3})?(#date_\d+%).+?(#prep_\d+%).{0,3}(#number_\d+%).{0,50}?(#dtime_\d+%)/gmi,
			extract: function( tokens, match, text ) {
				if ( tokens[ SD_tools._getNumber( match.match_items[ 3 ] ) ].func() > 23 ) return;
				return {
					"event_startDate" : tokens[ SD_tools._getNumber( match.match_items[ 1 ] ) ].func(),
					"event_startTime" : { h : tokens[ SD_tools._getNumber( match.match_items[ 3 ] ) ].func(), m : 0 },
					"event_duration" : SD_tools._durationCounter( +tokens[ SD_tools._getNumber( match.match_items[ 4 ] ) ].func(), false, true ),
					"event_result" : text,
					"priority" : 30 + tokens[ SD_tools._getNumber( match.match_items[ 1 ])].priority + tokens[ SD_tools._getNumber( match.match_items[ 4 ])].priority
				};
			},
			id : 'c32'
		},
		{
			// alarm + | duration + | date - | time + s a
			regExp: /(?:(#prep_\d+%).{0,3})?(#time_\d+%).+?(#actionremind_\d+%).+(#dtime_\d+%)/gmi,
			extract: function( tokens, match, text ) {
				var k1 = 1, k2 = '', c = {
					"event_startTime" : tokens[ SD_tools._getNumber( match.match_items[ 1 ] ) ].func(),
					"event_duration" : SD_tools._durationCounter( tokens[ SD_tools._getNumber( match.match_items[ 3 ] ) ].func(), false , true ),
					"event_alarms" : "0",
					"event_result" : text,
					"priority" : 30 + tokens[ SD_tools._getNumber( match.match_items[ 1 ])].priority + tokens[ SD_tools._getNumber( match.match_items[ 3 ])].priority
				};
				SD_tools._publicateQuery( {
					query: { date : true },
					callback : function( res ) {
						c.event_startDate = res.date;
						this.match = match;
						return c;
					}
				} );
			},
			id : 'c33'
		},
		{
			// alarm - | duration - | date + s a | time + s a hours/mins in night
			regExp: /(?:(#prep_\d+%).{0,3})?(#date_\d+%)(?:.+?(#prep_\d+%).{0,3}|.{0,5})(#time_\d+%).+?(#actionremind_\d+%)/gmi,
			extract: function( tokens, match, text ) {
				return {
					"event_startDate" : tokens[ SD_tools._getNumber( match.match_items[ 1 ] ) ].func(),
					"event_startTime" : tokens[ SD_tools._getNumber( match.match_items[ 3 ] ) ].func(),
					"event_alarms" : '0',
					"event_result" : text,
					"priority" : 30 + tokens[ SD_tools._getNumber( match.match_items[ 1 ])].priority + tokens[ SD_tools._getNumber( match.match_items[ 3 ])].priority
				};
			},
			id : 'c34'
		},
		{
			// alarm - | duration + s | date + s | time + s from to duration
			regExp: /(?:(#prep_\d+%|#from_\d+%).{0,10})?(#time_\d+%).{0,20}(#to_\d+%).{0,10}(#time_\d+%)/gmi,
			extract: function( tokens, match, text ) {
				var c = {
					"event_startTime": tokens[ SD_tools._getNumber( match.match_items[ 1 ] ) ].func(),
					"event_duration" : SD_tools._durationCounter( tokens[ SD_tools._getNumber( match.match_items[ 1 ] ) ].func(), tokens[ SD_tools._getNumber( match.match_items[ 3 ] ) ].func() ),
					"event_result": text,
					"priority" : 30 + tokens[ SD_tools._getNumber( match.match_items[ 1 ]) ].priority + tokens[ SD_tools._getNumber( match.match_items[ 3 ]) ].priority
				};
				SD_tools._publicateQuery( {
					query: { date : true },
					callback : function( res ) {
						c.event_startDate = res.date;
						this.match = match;
						return c;
					}
				} );
			},
			id : 'c35'
		},
		{
			// alarm + | duration - | date + a r | time + in next month
			regExp: /(?:(#prep_\d+%).{0,5})?(#date_\d+%).+?(#actionremind_\d+%)(?:.+?(#prep_\d+%).{0,5}|.+?)(#time_\d+%)/gmi,
			extract: function( tokens, match, text ) {
				return {
					"event_startDate" : tokens[ SD_tools._getNumber( match.match_items[ 1 ] ) ].func(),
					"event_startTime": tokens[ SD_tools._getNumber( match.match_items[ 4 ] ) ].func(),
					"event_alarms" : '0',
					"event_result" : text,
					"priority" : 30 + tokens[ SD_tools._getNumber( match.match_items[ 1 ])].priority + tokens[ SD_tools._getNumber( match.match_items[ 4 ]) ].priority
				};
			},
			id : 'c36'
		},
		{
			// alarm + e a | duration + | date - | time + s a
			regExp: /(?:(#prep_\d+%).{0,3})?(#time_\d+%).{0,3}[-].{0,3}(#time_\d+%).+?(#actionremind_\d+%).{0,5}(#rtime_\d+%)/gmi,
			extract: function( tokens, match, text ) {
				var k1 = 1, k2 = '', c = {
					"event_startTime" : tokens[ SD_tools._getNumber( match.match_items[ 1 ] ) ].func(),
					"event_alarms" : tokens[ SD_tools._getNumber( match.match_items[ 4 ] ) ].func(),
					"event_duration" :  SD_tools._durationCounter( tokens[ SD_tools._getNumber( match.match_items[ 1 ] ) ].func(), tokens[ SD_tools._getNumber( match.match_items[ 2 ] ) ].func() ),
					"event_result" : text,
					"priority" : 30 + tokens[ SD_tools._getNumber( match.match_items[ 1 ])].priority + tokens[ SD_tools._getNumber( match.match_items[ 2 ])].priority + tokens[ SD_tools._getNumber( match.match_items[ 4 ])].priority
				};
				SD_tools._publicateQuery( {
					query: { date : true },
					callback : function( res ) {
						c.event_startDate = res.date;
						this.match = match;
						return c;
					}
				} );
			},
			id : 'c37'
		},
		// *** 3 params ***
		// *** 2 params ***
		{//TODO SD_tools.now() for duration
			// alarm - | duration + a | date + s | time - from to duration
			regExp: /(#date_\d+%).+?(#to_\d+%).{0,3}(#time_\d+%)/gmi,
			extract: function( tokens, match, text ) {
				var c = {
					"event_startDate" : tokens[ SD_tools._getNumber( match.match_items[ 0 ] ) ].func(),
					"event_result" : text,
					"priority" : 20 + tokens[ SD_tools._getNumber( match.match_items[ 0 ])].priority + tokens[ SD_tools._getNumber( match.match_items[ 2 ])].priority
				};
				SD_tools._publicateQuery( {
					query: { date : c.event_startDate, time : true, workTime : SD_tools.workTime },
					callback: function ( res ) {
						c.event_startTime = res.time;
						c.event_duration = SD_tools._durationCounter( c.event_startTime, tokens[ SD_tools._getNumber( match.match_items[ 2 ])].func() );
						this.match = match;
						return c;
					}
				} );
			},
			id : 'c38'
		},
		{
			// alarm - | duration + s | date - s | time + s from to duration
			regExp: /(?:(#prep_\d+%).{0,5})?(#time_\d+%).{0,3}[–-].{0,3}(#time_\d+%)/gmi,
			extract: function( tokens, match, text ) {
				var c = {
					"event_startTime" : tokens[ SD_tools._getNumber( match.match_items[ 1 ] ) ].func(),
					"event_duration" :  SD_tools._durationCounter( tokens[ SD_tools._getNumber( match.match_items[ 1 ] ) ].func(), tokens[ SD_tools._getNumber( match.match_items[ 2 ] ) ].func() ),
					"event_result" : text,
					"priority" : 20 + tokens[ SD_tools._getNumber( match.match_items[ 1 ])].priority + tokens[ SD_tools._getNumber( match.match_items[ 2 ])].priority
				};
				SD_tools._publicateQuery( {
					query: { date : true },
					callback: function ( res ) {
						c.event_startDate = res.date;
						this.match = match;
						return c;
					}
				} );
			},
			id : 'c38a'
		},
		{
			// alarm - | duration + | date + s | time + a action_remind
			regExp: /(?:(#prep_\d+%).{0,3})?(#date_\d+%).+?(#dtime_\d+%)/gmi,
			extract: function( tokens, match, text ) {
				var c = {
					"event_startDate" : tokens[ SD_tools._getNumber( match.match_items[ 1 ] ) ].func(),
					"event_duration" : SD_tools._durationCounter( tokens[ SD_tools._getNumber( match.match_items[ 2 ] ) ].func(), false, true ),
					"event_result" : text,
					"priority" : 30 + tokens[ SD_tools._getNumber( match.match_items[ 1 ])].priority + tokens[ SD_tools._getNumber( match.match_items[ 2 ])].priority
				};
				SD_tools._publicateQuery( {
					query: { date : c.event_startDate, time : true, workTime : SD_tools.workTime },
					callback: function ( res ) {
						c.event_startTime = res.time;
						this.match = match;
						return c;
					}
				} );
			},
			id : 'c39'
		},
		{
			// alarm - | duration + | date + s | time + a action_remind
			regExp: /(#dtime_\d+%).+?(?:(#prep_\d+%).{0,3})?(#date_\d+%)/gmi,
			extract: function( tokens, match, text ) {
				var c = {
					"event_startDate" : tokens[ SD_tools._getNumber( match.match_items[ 2 ] ) ].func(),
					"event_duration" : SD_tools._durationCounter( tokens[ SD_tools._getNumber( match.match_items[ 0 ] ) ].func(), false, true ),
					"event_result" : text,
					"priority" : 30 + tokens[ SD_tools._getNumber( match.match_items[ 0 ])].priority + tokens[ SD_tools._getNumber( match.match_items[ 2 ])].priority
				};
				SD_tools._publicateQuery( {
					query: { date : c.event_startDate, time : true, workTime : SD_tools.workTime },
					callback: function ( res ) {
						c.event_startTime = res.time;
						this.match = match;
						return c;
					}
				} );
			},
			id : 'c40'
		},
		{//TODO duration priority
			// alarm + e | duration - | date - | time + a r
			regExp: /(#after_\d+%).{0,5}(#dtime_\d+%).+(#actionremind_\d+%).{0,3}(#rtime_\d+%)/gmi,
			extract: function( tokens, match, text ) {
				var k1 = 1, k2= '', c = {
					"event_startTime" : { h : +SD_tools.now( 0, 'h') + +tokens[ SD_tools._getNumber( match.match_items[ 1 ] ) ].func().h, m : +SD_tools.now( 0, 'm') + +tokens[ SD_tools._getNumber( match.match_items[ 1 ] ) ].func().m },
					"event_alarms" : tokens[ SD_tools._getNumber( match.match_items[ 3 ] ) ].func(),
					"event_result" : text,
					"priority" : 20 + tokens[ SD_tools._getNumber( match.match_items[ 1 ])].priority + tokens[ SD_tools._getNumber( match.match_items[ 3 ])].priority
				};
				SD_tools._publicateQuery( {
					query: { date : true },
					callback: function ( res ) {
						c.event_startDate = res.date;
						this.match = match;
						return c;
					}
				} );
			},
			id : 'c41'
		},
		{
			// alarm - | duration + s | date + s | time + s from to duration
			regExp: /(#time_\d+%).{0,3}[-].{0,3}(#time_\d+%)/gmi,
			extract: function( tokens, match, text ) {
				var c = {
					"event_startTime" : tokens[ SD_tools._getNumber( match.match_items[ 0 ] ) ].func(),
					"event_duration" :  SD_tools._durationCounter( tokens[ SD_tools._getNumber( match.match_items[ 0 ] ) ].func(), tokens[ SD_tools._getNumber( match.match_items[ 1 ] ) ].func() ),
					"event_result" : text,
					"priority" : 21 + tokens[ SD_tools._getNumber( match.match_items[ 0 ])].priority + tokens[ SD_tools._getNumber( match.match_items[ 1 ])].priority
				};
				SD_tools._publicateQuery( {
					query: { date : true },
					callback: function ( res ) {
						c.event_startDate = res.date;
						this.match = match;
						return c;
					}
				} );
			},
			id : 'c42'
		},
		{//TODO duration priority
			// alarm - | duration + | date - | time + a r
			regExp: /(#after_\d+%).{0,5}(#time_\d+%).+?(#dtime_\d+%)/gmi,
			extract: function( tokens, match, text ) {
				var k1 = 1, k2= '', c = {
					"event_startTime" : { h : +SD_tools.now( 0, 'h') + +tokens[ SD_tools._getNumber( match.match_items[ 1 ] ) ].func().h, m : +SD_tools.now( 0, 'm') + +tokens[ SD_tools._getNumber( match.match_items[ 1 ] ) ].func().m },
					"event_duration" : SD_tools._durationCounter( tokens[ SD_tools._getNumber( match.match_items[ 2 ] ) ].func(), false, true ),
					"event_result" : text,
					"priority" : 20 + tokens[ SD_tools._getNumber( match.match_items[ 1 ])].priority + tokens[ SD_tools._getNumber( match.match_items[ 2 ])].priority
				};
				SD_tools._publicateQuery( {
					query: { date : true},
					callback: function ( res ) {
						c.event_startDate = res.date;
						this.match = match;
						return c;
					}
				} );
			},
			id : 'c43'
		},
		{//TODO duration priority
			// alarm - | duration + | date - | time + a r
			regExp: /(#after_\d+%).{0,5}(#time_\d+%).+?(#actionremind_\d+%)/gmi,
			extract: function( tokens, match, text ) {
				var k1 = 1, k2= '', c = {
					"event_startTime" : { h : +SD_tools.now( 0, 'h') + +tokens[ SD_tools._getNumber( match.match_items[ 1 ] ) ].func().h, m : +SD_tools.now( 0, 'm') + +tokens[ SD_tools._getNumber( match.match_items[ 1 ] ) ].func().m },
					"event_alarms" : '0',
					"event_result" : text,
					"priority" : 20 + tokens[ SD_tools._getNumber( match.match_items[ 1 ])].priority
				};
				SD_tools._publicateQuery( {
					query: { date : true},
					callback: function ( res ) {
						c.event_startDate = res.date;
						this.match = match;
						return c;
					}
				} );
			},
			id : 'c44'
		},
		{
			// alarm + e a | duration - | date - | time + s a
			regExp: /(?:(#prep_\d+%).{0,3})?(#time_\d+%).+?(#dtime_\d+%).+?(#actionremind_\d+%).{0,5}(#rtime_\d+%)/gmi,
			extract: function( tokens, match, text ) {
				var k1 = 1, k2 = '', c = {
					"event_startTime" : tokens[ SD_tools._getNumber( match.match_items[ 1 ] ) ].func(),
					"event_alarms" : tokens[ SD_tools._getNumber( match.match_items[ 4 ] ) ].func(),
					"event_duration" : SD_tools._durationCounter( tokens[ SD_tools._getNumber( match.match_items[ 2 ] ) ].func(), false, true ),
					"event_result" : text,
					"priority" : 20 + tokens[ SD_tools._getNumber( match.match_items[ 1 ] )].priority + tokens[ SD_tools._getNumber( match.match_items[ 2 ] ) ].priority + tokens[ SD_tools._getNumber( match.match_items[ 4 ] )].priority
				};
				SD_tools._publicateQuery( {
					query: { date : true },
					callback : function( res ) {
						c.event_startDate = res.date;
						this.match = match;
						return c;
					}
				} );
			},
			id : 'c45'
		},
		{
			// alarm + e a | duration - | date - | time + s a
			regExp: /(?:(#prep_\d+%).{0,3})?(#time_\d+%).+?(#actionremind_\d+%).{0,5}(#rtime_\d+%)/gmi,
			extract: function( tokens, match, text ) {
				var k1 = 1, k2 = '', c = {
					"event_startTime" : tokens[ SD_tools._getNumber( match.match_items[ 1 ] ) ].func(),
					"event_alarms" : tokens[ SD_tools._getNumber( match.match_items[ 3 ] ) ].func(),
					"event_result" : text,
					"priority" : 20 + tokens[ SD_tools._getNumber( match.match_items[ 1 ])].priority + tokens[ SD_tools._getNumber( match.match_items[ 3 ])].priority
				};
				SD_tools._publicateQuery( {
					query: { date : true },
					callback : function( res ) {
						c.event_startDate = res.date;
						this.match = match;
						return c;
					}
				} );
			},
			id : 'c46'
		},
		{
			// alarm - | duration + | date - | time + s a
			regExp: /(?:(#prep_\d+%).{0,3})?(#time_\d+%).+?(#dtime_\d+%)/gmi,
			extract: function( tokens, match, text ) {
				var k1 = 1, k2 = '', c = {
					"event_startTime" : tokens[ SD_tools._getNumber( match.match_items[ 1 ] ) ].func(),
					"event_duration" : SD_tools._durationCounter( tokens[ SD_tools._getNumber( match.match_items[ 2 ] ) ].func(), false, true ),
					"event_result" : text,
					"priority" : 20 + tokens[ SD_tools._getNumber( match.match_items[ 1 ])].priority + tokens[ SD_tools._getNumber( match.match_items[ 2 ])].priority
				};
				SD_tools._publicateQuery( {
					query: { date : true },
					callback : function( res ) {
						c.event_startDate = res.date;
						this.match = match;
						return c;
					}
				} );
			},
			id : 'c47'
		},
		{
			// alarm + e a | duration - | date - | time - s a
			regExp: /(?:(#prep_\d+%).{0,3})?(#date_\d+%)(?:.|\n){0,150}?(#actionremind_\d+%).{0,5}(#rtime_\d+%)/gmi,
			extract: function( tokens, match, text ) {
				var c = {
					"event_startDate" : tokens[ SD_tools._getNumber( match.match_items[ 1 ] ) ].func(),
					"event_alarms" : tokens[ SD_tools._getNumber( match.match_items[ 3 ] ) ].func(),
					"event_result" : text,
					"priority" : 20 + tokens[ SD_tools._getNumber( match.match_items[ 1 ])].priority + tokens[ SD_tools._getNumber( match.match_items[ 3 ])].priority
				};
				SD_tools._publicateQuery( {
					query: { date : c.event_startDate, time : true, workTime : SD_tools.workTime },
					callback : function( res ) {
						c.event_startTime = res.time;
						this.match = match;
						return c;
					}
				} );
			},
			id : 'c48'
		},
		{
			// alarm + e a | duration - | date - | time + s a
			regExp: /(?:(#prep_\d+%).{0,3})?(#number_\d+%).+?(#actionremind_\d+%).{0,5}(#rtime_\d+%)/gmi,
			extract: function( tokens, match, text ) {
				var c = {
					"event_startTime" : { h : tokens[ SD_tools._getNumber( match.match_items[ 1 ] ) ].func(), m : 0 },
					"event_alarms" : tokens[ SD_tools._getNumber( match.match_items[ 3 ] ) ].func(),
					"event_result" : text,
					"priority" : 20 + tokens[ SD_tools._getNumber( match.match_items[ 3 ])].priority
				};
				SD_tools._publicateQuery( {
					query: { date : true },
					callback : function( res ) {
						c.event_startDate = res.date;
						this.match = match;
						return c;
					}
				} );
			},
			id : 'c49'
		},
		{//todo number as 'час'
			// alarm + e a | duration - | date + s a | time - action_remind
			regExp: /(?:(#prep_\d+%).{0,3})?(#date_\d+%).+?(#actionremind_\d+%).{0,3}(#rtime_\d+%)/gmi,
			extract: function( tokens, match, text ) {
				var c = {
					"event_startDate" : tokens[ SD_tools._getNumber( match.match_items[ 1 ] ) ].func(),
					"event_alarms" : tokens[ SD_tools._getNumber( match.match_items[ 3 ] ) ].func(),
					"event_result" : text,
					"priority" : 20 + tokens[ SD_tools._getNumber( match.match_items[ 1 ])].priority + tokens[ SD_tools._getNumber( match.match_items[ 3 ])].priority
				};
				SD_tools._publicateQuery( {
					query: { date : c.event_startDate, time : true, workTime : SD_tools.workTime },
					callback : function( res ) {
						c.event_startTime = res.time;
						this.match = match;
						return c;
					}
				} );
			},
			id : 'c50'
		},
		{
			// alarm - | duration - | date + s | time + index
			regExp: /(#actionremind_\d+%)(?:.+?(#prep_\d+%).{0,3}|.{0,5})(#number_\d+%)(?:.+?(#prep_\d+%).{0,3}|.{0,5})(#date_\d+%)/gmi,
			extract: function( tokens, match, text ) {
				var k1 = 1, k2= '', c = {
					"event_startDate" :  tokens[ SD_tools._getNumber( match.match_items[ 4 ] ) ].func(),
					"event_startTime" : { h : tokens[ SD_tools._getNumber( match.match_items[ 2 ] ) ].func(), m : 0 },
					"event_result" : text,
					"priority" : 20 + tokens[ SD_tools._getNumber( match.match_items[ 4 ])].priority
				};
				SD_tools._publicateQuery( {
					query: { date : c.event_startDate, time : true, workTime: SD_tools.workTime },
					callback : function( res ) {
						c.event_startTime = res.time;
						this.match = match;
						return c;
					}
				} );
			},
			id : 'c51'
		},
		{
			// alarm + e | duration - | date + | time - date type XX month XX year
			regExp: /(?:(#prep_\d+%).{0,3})?(#date_\d+%).{0,5}(#actionremind_\d+%)(?:.+(#prep_\d+%).{0,3}|.{0,5})(#number_\d+%)/gmi,
			extract: function( tokens, match, text ) {
				var k1 = 1, k2 = '', c = {
					"event_startDate" : tokens[ SD_tools._getNumber( match.match_items[ 1 ] ) ].func(),
					"event_startTime" : { h : tokens[ SD_tools._getNumber( match.match_items[ 4 ] ) ].func(), m : 0 },
					"event_result" : text,
					"priority" : 20 + tokens[ SD_tools._getNumber( match.match_items[ 1 ])].priority
				};
				SD_tools._publicateQuery( {
					query: { date : c.event_startDate, time : true, workTime : SD_tools.workTime },
					callback : function( res ) {
						c.event_startTime = res.time;
						this.match = match;
						return c;
					}
				} );
			},
			id : 'c52'
		},
		{
			// alarm + | duration - | date - | time + s just date
			regExp: /(?:(#prep_\d+%).{0,3})?(#time_\d+%).+?(#actionremind_\d+%)/gmi,
			extract: function( tokens, match, text ) {
				var c = {
					"event_startTime" : tokens[ SD_tools._getNumber( match.match_items[ 1 ] ) ].func(),
					"event_alarms" : '0',
					"event_result" : text,
					"priority" : 18 + tokens[ SD_tools._getNumber( match.match_items[ 1 ])].priority
				};
				SD_tools._publicateQuery( {
					query: { date : true },
					callback : function( res ) {
						c.event_startDate = res.date;
						this.match = match;
						return c;
					}
				} );
			},
			id : 'c53'
		},
		{
			// alarm + | duration - | date - | time + a
			regExp: /(#actionremind_\d+%)(?:.+?(#prep_\d+%).{0,3}|.{0,5})(#time_\d+%)/gmi,
			extract: function( tokens, match, text ) {
				var c = {
					"event_startTime" : tokens[ SD_tools._getNumber( match.match_items[ 2 ] ) ].func(),
					"event_alarms" : '0',
					"event_result" : text,
					"priority" : 18 + tokens[ SD_tools._getNumber( match.match_items[ 2 ])].priority
				};
				SD_tools._publicateQuery( {
					query: { date : true },
					callback : function( res ) {
						c.event_startDate = res.date;
						this.match = match;
						return c;
					}
				} );
			},
			id : 'c54'
		},
		{
			// alarm + | duration - | date + a r | time - in next month
			regExp: /(?:(#prep_\d+%).{0,5})?(#date_\d+%).+?(#actionremind_\d+%)/gmi,
			extract: function( tokens, match, text ) {
				var c = {
					"event_startDate" : tokens[ SD_tools._getNumber( match.match_items[ 1 ] ) ].func(),
					"event_alarms" : '0',
					"event_result" : text,
					"priority" : 18 + tokens[ SD_tools._getNumber( match.match_items[ 1 ])].priority
				};
				SD_tools._publicateQuery( {
					query: { date : c.event_startDate, time : true, workTime : SD_tools.workTime },
					callback : function( res ) {
						c.event_startTime= res.time;
						this.match = match;
						return c;
					}
				} );
			},
			id : 'c55'
		},
		{
			// alarm + | duration - | date + s | time - date type XX month XX year
			regExp: /(#actionremind_\d+%).+?(?:.{0,5}(#prep_\d+%).{0,5}|.{0,5})(#date_\d+%)/gmi,
			extract: function( tokens, match, text ) {
				var c = {
					"event_startDate" : tokens[ SD_tools._getNumber( match.match_items[ 2 ] ) ].func(),
					"event_alarms" : "0",
					"event_result" : text,
					"priority" : 18 + tokens[ SD_tools._getNumber( match.match_items[ 2 ])].priority
				};
				SD_tools._publicateQuery( {
					query: { date : c.event_startDate, time : true, workTime : SD_tools.workTime },
					callback : function( res ) {
						c.event_startTime = res.time;
						this.match = match;
						return c;
					}
				} );
			},
			id : 'c56'
		},
		{
			// alarm - | duration - | date + s a | time + s a hours/mins in night
			regExp: /(?:(#prep_\d+%).{0,3})?(#date_\d+%)(?:(?:.|\n){0,200}?(#prep_\d+%).{0,10}?|(?:.|\n){0,200}?)(#time_\d+%)/gmi,
			extract: function( tokens, match, text ) {
				return {
					"event_startDate" : tokens[ SD_tools._getNumber( match.match_items[ 1 ] ) ].func(),
					"event_startTime" : tokens[ SD_tools._getNumber( match.match_items[ 3 ] ) ].func(),
					"event_result" : text,
					"priority" : 20 + tokens[ SD_tools._getNumber( match.match_items[ 1 ])].priority + tokens[ SD_tools._getNumber( match.match_items[ 3 ])].priority
				};
			},
			id : 'c57'
		},
		{
			// alarm - | duration - | date + s a | time + s a hours/mins in night
			regExp: /(?:(#prep_\d+%).{0,3})?(#date_\d+%).+?(#prep_\d+%).{0,3}(#number_\d+%)/gmi,
			extract: function( tokens, match, text ) {
				return {
					"event_startDate" : tokens[ SD_tools._getNumber( match.match_items[ 1 ] ) ].func(),
					"event_startTime" : { h : tokens[ SD_tools._getNumber( match.match_items[ 3 ] ) ].func(), m : 0 },
					"event_result" : text,
					"priority" : 20 + tokens[ SD_tools._getNumber( match.match_items[ 1 ])].priority
				};
			},
			id : 'c58'
		},
		{
			// alarm - | duration - | date + s a | time + s a hours/mins in night
			regExp: /(?:(#prep_\d+%).{0,3})?(#time_\d+%)(?:.+?(#prep_\d+%).{0,3}|.{0,5})(#date_\d+%)/gmi,
			extract: function( tokens, match, text ) {
				if ( tokens[ SD_tools._getNumber( match.match_items[ 1 ] )].priority < 6 ) return;
				return {
					"event_startDate" : tokens[ SD_tools._getNumber( match.match_items[ 3 ] ) ].func(),
					"event_startTime" : tokens[ SD_tools._getNumber( match.match_items[ 1 ] ) ].func(),
					"event_result" : text,
					"priority" : 20 + tokens[ SD_tools._getNumber( match.match_items[ 1 ])].priority + tokens[ SD_tools._getNumber( match.match_items[ 3 ])].priority
				};
			},
			id : 'c59'
		},
		{//TODO duration counts incorrectly
			// alarm - | duration + s | date - | time + s from to duration
			regExp: /(#prep_\d+%).{0,3}(#time_\d+%).?[-].?(#time_\d+%)/gmi,
			extract: function( tokens, match, text ) {
				var c = {
					"event_startTime" : tokens[ SD_tools._getNumber( match.match_items[ 1 ] ) ].func(),
					"event_duration" : SD_tools._durationCounter( tokens[ SD_tools._getNumber( match.match_items[ 1 ] ) ].func(), tokens[ SD_tools._getNumber( match.match_items[ 2 ] ) ].func() ),
					"event_result" : text,
					"priority" : 20 + tokens[ SD_tools._getNumber( match.match_items[ 1 ])].priority + tokens[ SD_tools._getNumber( match.match_items[ 2 ])].priority
				};
				SD_tools._publicateQuery( {
					query: { date : true },
					callback : function( res ) {
						c.event_startDate = res.date;
						this.match = match;
						return c;
					}
				} );
			},
			id : 'c60'
		},
		{//TODO smth's wrong here
			// alarm - | duration + s a | date - | time + s  from to duration
			regExp: /(#from_\d+%|#prep_\d+%).{0,3}(#time_\d+%).{0,50}?(#to_\d+%).{0,3}(#time_\d+%)/gmi,
			extract: function( tokens, match, text ) {
				var c = {
					"event_startTime" : tokens[ SD_tools._getNumber( match.match_items[ 1 ] ) ].func(),
					"event_duration" : SD_tools._durationCounter( tokens[ SD_tools._getNumber( match.match_items[ 1 ] ) ].func(), tokens[ SD_tools._getNumber( match.match_items[ 3 ] ) ].func() ),
					"event_result" : text,
					"priority" : 20 + tokens[ SD_tools._getNumber( match.match_items[ 1 ])].priority + tokens[ SD_tools._getNumber( match.match_items[ 3 ])].priority
				};
				SD_tools._publicateQuery( {
					query: { date : true },
					callback : function( res ) {
						c.event_startDate = res.date;
						this.match = match;
						return c;
					}
				} );
			},
			id : 'c61'
		},
		{//TODO smth's wrong here
			// alarm - | duration + s a | date - | time + s  from to duration
			regExp: /(#from_\d+%).{0,3}(#number_\d+%).{0,3}(#to_\d+%).{0,3}(#time_\d+%)/gmi,
			extract: function( tokens, match, text ) {
				var c = {
					"event_startTime" : { h : tokens[ SD_tools._getNumber( match.match_items[ 1 ] ) ].func() , m : 0 },
					"event_duration" : SD_tools._durationCounter( tokens[ +SD_tools._getNumber( match.match_items[ 1 ] ) ].func(), tokens[ SD_tools._getNumber( match.match_items[ 3 ] ) ].func() ),
					"event_result" : text,
					"priority" : 18 + tokens[ SD_tools._getNumber( match.match_items[ 3 ])].priority
				};
				SD_tools._publicateQuery( {
					query: { date : true },
					callback : function( res ) {
						c.event_startDate = res.date;
						this.match = match;
						return c;
					}
				} );
			},
			id : 'c62'
		},
		{//TODO smth's wrong here
			// alarm - | duration + s a | date - | time + s  from to duration
			regExp: /(#from_\d+%).{0,3}(#number_\d+%).{0,3}(#to_\d+%).{0,3}(#number_\d+%)/gmi,
			extract: function( tokens, match, text ) {
				var c = {
					"event_startTime" : { h : tokens[ SD_tools._getNumber( match.match_items[ 1 ] ) ].func(), m: 0 },
					"event_duration" : SD_tools._durationCounter( +tokens[ SD_tools._getNumber( match.match_items[ 1 ] ) ].func(), +tokens[ SD_tools._getNumber( match.match_items[ 3 ] ) ].func() ),
					"event_result" : text,
					"priority" : 20
				};
				SD_tools._publicateQuery( {
					query: { date : true },
					callback : function( res ) {
						c.event_startDate = res.date;
						this.match = match;
						return c;
					}
				} );
			},
			id : 'c63'
		},
		{//TODO analyze for compl
			// alarm - | duration + a | date + s | time - date from to duration ?wtf
			regExp: /(#date_\d+%).+?(#prep_\d+%).{0,3}(#number_\d+%)/gmi,
			extract: function( tokens, match, text ) {
				if ( tokens[ SD_tools._getNumber( match.match_items[ 2 ] ) ].func() > 23 ) return;
				return {
					"event_startDate" : tokens[ SD_tools._getNumber( match.match_items[ 0 ] ) ].func(),
					"event_startTime" : { h : tokens[ SD_tools._getNumber( match.match_items[ 2 ] ) ].func(), m : 0 },
					"event_result" : text,
					"priority" : 17 + tokens[ SD_tools._getNumber( match.match_items[ 0 ])].priority
				};
			},
			id : 'c64'
		},
		{//TODO analyze for compl
			// alarm - | duration + a | date + s | time - date from to duration ?wtf
			regExp: /(#date_\d+%).{0,25}?(#to_\d+%).{0,3}(#number_\d+%)/gmi,
			extract: function( tokens, match, text ) {
				if ( tokens[ SD_tools._getNumber( match.match_items[ 2 ] ) ].func() > 23 ) return;
				var c = {
					"event_startDate" : tokens[ SD_tools._getNumber( match.match_items[ 0 ] ) ].func(),
					"event_result" : text,
					"priority" : 17 + tokens[ SD_tools._getNumber( match.match_items[ 0 ])].priority
				};
				SD_tools._publicateQuery( {
					query: { date : c.event_startDate, time : true, workTime : SD_tools.workTime },
					callback : function( res ) {
						c.event_startTime = res.time;
						c.event_duration = SD_tools._durationCounter( c.event_startTime, tokens[ SD_tools._getNumber( match.match_items[ 2 ] )].func() );
						this.match = match;
						return c;
					}
				} );
			},
			id : 'c65'
		},
		{
			// alarm - | duration - a | date + s | time + in duration date ?wtf
			regExp: /(#prep_\d+%).{0,3}(#number_\d+%).{0,3}(#date_\d+%)/gmi,
			extract: function( tokens, match, text ) {
				return {
					"event_startDate" : tokens[SD_tools._getNumber(match.match_items[ 2 ])].func(),
					"event_startTime" : { h : tokens[SD_tools._getNumber(match.match_items[ 1 ])].func(), m : 0 },
					"event_result": text,
					"priority" : 20 + tokens[ SD_tools._getNumber( match.match_items[ 2 ])].priority
				};
			},
			id : 'c66'
		},
		{
			// alarm - | duration - a | date + s | time + in duration date ?wtf
			regExp: /(?:(#prep_\d+%).{0,3})?(#date_\d+%).{0,3}(#prep_\d+%).{0,3}(#number_\d+%)/gmi,
			extract: function( tokens, match, text ) {
				return {
					"event_startDate" : tokens[SD_tools._getNumber(match.match_items[ 1 ])].func(),
					"event_startTime" : { h : tokens[SD_tools._getNumber(match.match_items[ 3 ])].func(), m : 0, duplicity : tokens[SD_tools._getNumber(match.match_items[ 3 ])].func() < 12 && true },
					"event_result": text,
					"priority" : 20 + tokens[ SD_tools._getNumber( match.match_items[ 1 ])].priority
				};
			},
			id : 'c67'
		},
		// *** 2 params end ***
		// *** 1 param ***
		{
			// alarm + e| duration - | date - | time - index
			regExp: /(#actionremind_\d+%).{0,5}(#rtime_\d+%)/gmi,
			extract: function( tokens, match, text ) {
				var c = {
					"event_alarms" : tokens[ SD_tools._getNumber( match.match_items[ 1 ] ) ].func(),
					"event_result" : text,
					"priority" : 10 + tokens[ SD_tools._getNumber( match.match_items[ 1 ])].priority
				};
				SD_tools._publicateQuery( {
					query: { date : true, time : true },
					callback : function( res ) {
						c.event_startDate = res.date;
						c.event_startTime = res.time;
						this.match = match;
						return c;
					}
				} );
			},
			id : 'c68'
		},
		{
			// alarm - | duration - | date - | time + index
			regExp: /(?:(#prep_\d+%).{0,3})?(#time_\d+%)/gmi,
			extract: function( tokens, match, text ) {
				if ( tokens[ SD_tools._getNumber( match.match_items[ 1 ])].priority < 6 ) return;
				var c = {
					"event_startTime" : tokens[ SD_tools._getNumber( match.match_items[ 1 ] )].func(),
					"event_result" : text,
					"priority" : 10 + tokens[ SD_tools._getNumber( match.match_items[ 1 ])].priority
				};
				SD_tools._publicateQuery( {
					query: { date : true },
					callback : function( res ) {
						c.event_startDate = res.date;
						this.match = match;
						return c;
					}
				} );
			},
			id : 'c69'
		},
		{
			// alarm - | duration - | date - | time + index
			regExp: /(?:(#prep_\d+%|#before_\d+%).{0,3})?(#date_\d+%)/gmi,
			extract: function( tokens, match, text ) {
				var c = {
					"event_startDate" : tokens[ SD_tools._getNumber( match.match_items[ 1 ] )].func(),
					"event_result" : text,
					"priority" : 10 + tokens[ SD_tools._getNumber( match.match_items[ 1 ])].priority
				};
				SD_tools._publicateQuery( {
					query: { date : c.event_startDate, time : true, workTime : SD_tools.workTime },
					callback : function( res ) {
						c.event_startTime = res.time;
						this.match = match;
						return c;
					}
				} );
			},
			id : 'c70'
		},
		{//TODO duration priority
			// alarm - | duration + | date - | time + a r
			regExp: /(#after_\d+%).{0,5}(#dtime_\d+%)/gmi,
			extract: function( tokens, match, text ) {
				var k1 = 1, k2= '', c = {
					"event_startTime" : SD_tools.now( + +tokens[ SD_tools._getNumber( match.match_items[ 1 ] ) ].func().h * 60 + +tokens[ SD_tools._getNumber( match.match_items[ 1 ] ) ].func().m ),
					"event_result" : text,
					"priority" : 11 + tokens[ SD_tools._getNumber( match.match_items[ 1 ])].priority
				};
				SD_tools._publicateQuery( {
					query: { date : true },
					callback: function ( res ) {
						c.event_startDate = res.date;
						this.match = match;
						return c;
					}
				} );
			},
			id : 'c71'
		},
		{//TODO duration priority
			// alarm - | duration + | date - | time + a r
			regExp: /(#atime_\d+%)/gmi,
			extract: function( tokens, match, text ) {
				var c = {
					"event_startTime" : tokens[ SD_tools._getNumber( match.match_items[ 0 ] ) ].func(),
					"event_result" : text,
					"priority" : 11 + tokens[ SD_tools._getNumber( match.match_items[ 0 ])].priority
				};
				if ( tokens[ SD_tools._getNumber( match.match_items[ 0 ] ) ].func().duplicity === false ) c.event_startTime.duplicity = false;
				SD_tools._publicateQuery( {
					query: { date : true },
					callback: function ( res ) {
						c.event_startDate = res.date;
						this.match = match;
						return c;
					}
				} );
			},
			id : 'c72'
		},
		{//TODO could be anything
			// alarm - | duration - | date - | time + a r
			regExp: /(#after_\d+%).{0,5}(#number_\d+%).{0,5}(#number_\d+%)/gmi,
			extract: function( tokens, match, text ) {
				var c = {
					"event_startTime" : { h : SD_tools.now( +tokens[ SD_tools._getNumber( match.match_items[ 1 ] ) ].func() * 60 + +tokens[ SD_tools._getNumber( match.match_items[ 2 ] ) ].func(), 'h' ), m : SD_tools.now( +tokens[ SD_tools._getNumber( match.match_items[ 1 ] ) ].func() * 60 + +tokens[ SD_tools._getNumber( match.match_items[ 2 ] ) ].func(), 'm' ) },
					"event_result" : text,
					"priority" : 10
				};
				SD_tools._publicateQuery( {
					query: { date : true },
					callback : function( res ) {
						c.event_startDate = res.date;
						this.match = match;
						return c;
					}
				} );
			},
			id : 'c73'
		},
		{//TODO same
			// alarm - | duration - | date - | time + a r
			regExp: /(#after_\d+%).{0,5}(#number_\d+%)/gmi,
			extract: function( tokens, match, text ) {
				var c = {
					"event_startTime" : {},
					"event_result" : text,
					"priority" : 10
				};
				if ( tokens[ SD_tools._getNumber( match.match_items[ 1 ] ) ].origin.match( /ч/gmi ) ) {
					c.event_startTime.h = now ( tokens[ SD_tools._getNumber( match.match_items[ 1 ] ) ].func()*60, 'h' );
					c.event_startTime.m = now ( tokens[ SD_tools._getNumber( match.match_items[ 1 ] ) ].func()*60, 'm' );
				} else {
					c.event_startTime.h = now ( tokens[ SD_tools._getNumber( match.match_items[ 1 ] ) ].func(), 'h' );
					c.event_startTime.m = now ( tokens[ SD_tools._getNumber( match.match_items[ 1 ] ) ].func(), 'm' );
				}
				SD_tools._publicateQuery( {
					query: { date : true },
					callback : function( res ) {
						c.event_startDate = res.date;
						this.match = match;
						return c;
					}
				} );
			},
			id : 'c74'
		},
		{//TODO same
			// alarm - | duration - | date - | time + a r
			regExp: /(#prep_\d+%).{0,5}(#number_\d+%)/gmi,
			extract: function( tokens, match, text ) {
				var c = {
					"event_startTime" : { h : tokens[ SD_tools._getNumber( match.match_items[ 1 ] ) ].func(), m : 0 },
					"event_result" : text,
					"priority" : 6
				};
				SD_tools._publicateQuery( {
					query: { date : true },
					callback : function( res ) {
						c.event_startDate = res.date;
						this.match = match;
						return c;
					}
				} );
			},
			id : 'c75'
		}
	];
