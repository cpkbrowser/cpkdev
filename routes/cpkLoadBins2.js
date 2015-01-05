var express = require('express');
var router = express.Router();
var qs = require('querystring');
var http = require("http");
var mongoose = require('mongoose');
require('date-utils');
var __ = require('underscore');
var NodeCache = require( "node-cache" );
var myCache = new NodeCache();

router.post('/', function(req, res){
		
	var db = mongoose.connection;

	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function() {
		
		var testShow = mongoose.model('testShow');
		var objFGM;
		var objPPVS;
		var objMusic;
		var objDNM;
		var objCMD;
		var objANA;
		var objNWR;
		var objDoc;
		var objHBO;
		var objSci;
		var objAdult;
		var objDisney;
		
		function getFeelGood() {			
			testShow.find({$and: [{"tags": /.*Adventure.*/}, {"tags": /.*Comedy.*/}, {"show_type": "movie"}]}).sort({watch_count: -1}).limit(20).exec(function (fgmErr, fgmRslt) {
				if (fgmErr) {
					mongoose.disconnect();
					res.json({rsltFGM: 'DB Error'});
				} else if (fgmRslt == null) {
					finished();
				} else {
					objFGM = {
						obj: fgmRslt,
						bin_name: 'grdFeelGood',
						section_head: 'Feel Good Movies',
						container: 'grdFeelGood_Container',
						container_name: 'fgmItem_container',
						container_img: 'fgmItem_img',
						container_title: 'fgmItem_n',
						prefix: 'fgm',
						c_type: 'Fgm'
					};
					obj = {Bin: "FeelGood", objList: objFGM};
					var success = myCache.set("FeelGoodBin", obj, 60*60*12);
					console.log('Saved Cache "Feel Good": ' + success);
					finished();
				}
			});		
		}
		
		function getPayPerViewSports() {
			testShow.find({$or: [{"name": /.*UFC.*/}, {"name": /.*HBO Boxing.*/}, {"name": /.*Wrestlemania.*/}]}).sort({watch_count: -1}).limit(20).exec(function (ppvsErr, ppvsRslt) {
				if (ppvsErr) {
					mongoose.disconnect();
					res.json({rsltPPVS: 'DB Error'});
				} else if (ppvsRslt == null) {
					finished();
				} else {
					objPPVS = {
						obj: ppvsRslt,
						bin_name: 'grdPPVSports',
						section_head: 'Pay-Per-View Sports',
						container: 'grdPPVSports_Container',
						container_name: 'pvsItem_container',
						container_img: 'pvsItem_img',
						container_title: 'pvsItem_n',
						prefix: 'pvs',
						c_type: 'Pvs'
					};
					obj = {Bin: "PPVSports", objList: objPPVS};
					var success = myCache.set("PPVSportsBin", obj, 60*60*12);
					console.log('Saved Cache "PPVSports": ' + success);
					finished();
				}
			});
		}
		
		function getMusic() {
			testShow.find({$and: [{"tags": /.*Music.*/}, {"name": /.*Live.*/}]}).sort({watch_count: -1}).limit(20).exec(function (musicErr, musicRslt) {
				if (musicErr) {
					mongoose.disconnect();
					res.json({rsltMusic: 'DB Error'});
				} else if (musicRslt == null) {
					finished();
				} else {
					objMusic = {
						obj: musicRslt,
						bin_name: 'grdMusic',
						section_head: '(Mostly) Live Music',
						container: 'grdMusic_Container',
						container_name: 'mscItem_container',
						container_img: 'mscItem_img',
						container_title: 'mscItem_n',
						prefix: 'msc',
						c_type: 'Msc'
					};
					obj = {Bin: "PPVSports", objList: objMusic};
					var success = myCache.set("MusicBin", obj, 60*60*12);
					console.log('Saved Cache "Music": ' + success);
					finished();
				}
			});
		}
		
		function getDateNight() {
			testShow.find({$and: [{"tags": /.*Action.*/}, {"tags": /.*Romance.*/}]}).sort({watch_count: -1}).limit(20).exec(function (dnmErr, dnmRslt) {
				if (dnmErr) {
					mongoose.disconnect();
					res.json({rsltDNM: 'DB Error'});
				} else if (dnmRslt == null) {
					finished();
				} else {
					objDNM = {
						obj: dnmRslt,
						bin_name: 'grdDateNight',
						section_head: 'Date Night Movies',
						container: 'grdDateNight_Container',
						container_name: 'dnmItem_container',
						container_img: 'dnmItem_img',
						container_title: 'dnmItem_n',
						prefix: 'dnm',
						c_type: 'Dnm'
					};
					obj = {Bin: "DateNight", objList: objDNM};
					var success = myCache.set("DateNightBin", obj, 60*60*12);
					console.log('Saved Cache "DateNight": ' + success);
					finished();
				}
			});
		}
		
		function getComedy() {
			testShow.find({"tags": /.*Comedy.*/}).sort({watch_count: -1}).limit(20).exec(function (cmdErr, cmdRslt) {
				if (cmdErr) {
					mongoose.disconnect();
					res.json({rsltCMD: 'DB Error'});
				} else if (cmdRslt == null) {
					finished();
				} else {
					objCMD = {
						obj: cmdRslt,
						bin_name: 'grdComdey',
						section_head: 'Comedy',
						container: 'grdComdey_Container',
						container_name: 'cmdItem_container',
						container_img: 'cmdItem_img',
						container_title: 'cmdItem_n',
						prefix: 'cmd',
						c_type: 'Cmd'
					};
					obj = {Bin: "Comedy", objList: objCMD};
					var success = myCache.set("ComedyBin", obj, 60*60*12);
					console.log('Saved Cache "Comedy": ' + success);
					finished();
				}
			});
		}
		
		function getActionAdventure() {
			testShow.find({$or: [{"tags": /.*Action.*/}, {"tags": /.*Adventure.*/}]}).sort({watch_count: -1}).limit(20).exec(function (anaErr, anaRslt) {
				if (anaErr) {
					mongoose.disconnect();
					res.json({rsltANA: 'DB Error'});
				} else if (anaRslt == null) {
					finished();
				} else {
					objANA = {
						obj: anaRslt,
						bin_name: 'grdActionAdventure',
						section_head: 'Action & Adventure',
						container: 'grdActionAdventure_Container',
						container_name: 'anaItem_container',
						container_img: 'anaItem_img',
						container_title: 'anaItem_n',
						prefix: 'ana',
						c_type: 'Ana'
					};
					obj = {Bin: "ActionAdventure", objList: objANA};
					var success = myCache.set("ActionAdventureBin", obj, 60*60*12);
					console.log('Saved Cache "ActionAdventure": ' + success);
					finished();
				}
			});
		}
		
		function getNewReleases() {
			testShow.find({}).sort({"year": -1, "watch_count": -1}).limit(20).exec(function (nwrErr, nwrRslt) {
				if (nwrErr) {
					mongoose.disconnect();
					res.json({rsltNWR: 'DB Error'});
				} else if (nwrRslt == null) {
					finished();
				} else {
					objNWR = {
						obj: nwrRslt,
						bin_name: 'grdNewReleases',
						section_head: 'New Releases',
						container: 'grdNewReleasese_Container',
						container_name: 'nwrItem_container',
						container_img: 'nwrItem_img',
						container_title: 'nwrItem_n',
						prefix: 'nwr',
						c_type: 'Nwr'
					};
					obj = {Bin: "NewReleases", objList: objNWR};
					var success = myCache.set("NewReleasesBin", obj, 60*60*12);
					console.log('Saved Cache "NewReleases": ' + success);
					finished();
				}
			});
		}
		
		function getDocumentary(staticList) {
			var list = staticList.split(';');
			testShow.find({_id: {$in: list}}, function (docErr, docRslt) {
				if (docErr) {
					mongoose.disconnect();
					res.json({rsltDoc: 'DB Error'});
				} else if (docRslt == null) {
					finished();
				} else {
					objDoc = {
						obj: docRslt,
						bin_name: 'grdDocumentary',
						section_head: 'Documentaries',
						container: 'grdDocumentary_Container',
						container_name: 'docItem_container',
						container_img: 'docItem_img',
						container_title: 'docItem_n',
						prefix: 'doc',
						c_type: 'Doc'
					};
					obj = {Bin: "Documentary", objList: objDoc};
					var success = myCache.set("DocumentaryBin", obj, 60*60*12);
					console.log('Saved Cache "Documentary": ' + success);
					finished();
				}
			});
		}
		
		function getHBO(staticList) {
			var list = staticList.split(';');
			testShow.find({_id: {$in: list}}, function (hboErr, hboRslt) {
				if (hboErr) {
					mongoose.disconnect();
					res.json({rsltHBO: 'DB Error'});
				} else if (hboRslt == null) {
					finished();
				} else {
					objHBO = {
						obj: hboRslt,
						bin_name: 'grdHBO',
						section_head: 'Premiere Television',
						container: 'grdHBO_Container',
						container_name: 'hboItem_container',
						container_img: 'hboItem_img',
						container_title: 'hboItem_n',
						prefix: 'hbo',
						c_type: 'Hbo'
					};
					obj = {Bin: "HBO", objList: objHBO};
					var success = myCache.set("HBOBin", obj, 60*60*12);
					console.log('Saved Cache "HBO": ' + success);
					finished();
				}
			});
		}
		
		function getSciFi(staticList) {
			var list = staticList.split(';');
			testShow.find({_id: {$in: list}}, function (sciErr, sciRslt) {
				if (sciErr) {
					mongoose.disconnect();
					res.json({rsltSci: 'DB Error'});
				} else if (sciRslt == null) {
					finished();
				} else {
					objSci = {
						obj: sciRslt,
						bin_name: 'grdSciFi',
						section_head: 'Science Fiction',
						container: 'grdSciFi_Container',
						container_name: 'sciItem_container',
						container_img: 'sciItem_img',
						container_title: 'sciItem_n',
						prefix: 'sci',
						c_type: 'Sci'
					};
					obj = {Bin: "SciFi", objList: objSci};
					var success = myCache.set("SciFiBin", obj, 60*60*12);
					console.log('Saved Cache "SciFi": ' + success);
					finished();
				}
			});
		}
		
		function getAdultCartoons() {
			testShow.find({$and: [{"tags": /.*Animation.*/}, {"tags": /.*Comedy.*/}]}).sort({watch_count: -1}).limit(20).exec(function (adultErr, adultRslt) {
				if (adultErr) {
					mongoose.disconnect();
					res.json({rsltAdult: 'DB Error'});
				} else if (adultRslt == null) {
					finished();
				} else {
					objAdult = {
						obj: adultRslt,
						bin_name: 'grdAdult',
						section_head: 'Adult Cartoons',
						container: 'grdAdult_Container',
						container_name: 'adcItem_container',
						container_img: 'adcItem_img',
						container_title: 'adcItem_n',
						prefix: 'adc',
						c_type: 'Adc'
					};
					obj = {Bin: "AdultCartoons", objList: objAdult};
					var success = myCache.set("AdultCartoonsBin", obj, 60*60*12);
					console.log('Saved Cache "AdultCartoons": ' + success);
					finished();
				}
			});
		}
		
		function getDisney(staticList) {
			var list = staticList.split(';');
			testShow.find({_id: {$in: list}}, function (disneyErr, disneyRslt) {
				if (disneyErr) {
					mongoose.disconnect();
					res.json({rsltDisney: 'DB Error'});
				} else if (disneyRslt == null) {
					finished();
				} else {
					objDisney = {
						obj: disneyRslt,
						bin_name: 'grdKids',
						section_head: 'Childrens Shows',
						container: 'grdKids_Container',
						container_name: 'kidItem_container',
						container_img: 'kidItem_img',
						container_title: 'kidItem_n',
						prefix: 'kid',
						c_type: 'Kid'
					};
					obj = {Bin: "Disney", objList: objDisney};
					var success = myCache.set("DisneyBin", obj, 60*60*12);
					console.log('Saved Cache "Disney": ' + success);
					finished();
				}
			});
		}
		
		function returnAll() {
			//This will be called after all async operations are completed.
			var tmpBins = [
				{binData: objFGM},
				{binData: objPPVS},
				{binData: objMusic},
				{binData: objDNM},
				{binData: objCMD},
				{binData: objANA},
				{binData: objNWR},
				{binData: objAdult},
				{binData: objDoc},
				{binData: objHBO},
				{binData: objSci},
				{binData: objDisney}
			];
			
			mongoose.disconnect();
			res.json({Bins: tmpBins});
		}
		
		var finished = __.after(12, returnAll);
		//var finished = __.after(2, returnAll);
		
		if (req.body.fgm == 'true') {
			var obj;
			obj = myCache.get("FeelGoodBin");
			if (__.isEmpty(obj)) {
				getFeelGood();
			} else {
				objFGM = {
					obj: obj.FeelGoodBin.objList.obj,
					bin_name: 'grdFeelGood',
					section_head: 'Feel Good Movies',
					container: 'grdFeelGood_Container',
					container_name: 'fgmItem_container',
					container_img: 'fgmItem_img',
					container_title: 'fgmItem_n',
					prefix: 'fgm',
					c_type: 'Fgm'
				};
				console.log('found: Feel Good cache');
				//console.dir(obj);
				finished();
			}			
		} else {
			objFGM = {
				remove: 'grdFeelGood_Container'
			};
			finished();
		}
		
		if (req.body.ppvs == 'true') {
			var obj;
			obj = myCache.get("PPVSportsBin");
			if (__.isEmpty(obj)) {
				getPayPerViewSports();
			} else {
				objPPVS = {
					obj: obj.PPVSportsBin.objList.obj,
					bin_name: 'grdPPVSports',
					section_head: 'Pay-Per-View Sports',
					container: 'grdPPVSports_Container',
					container_name: 'pvsItem_container',
					container_img: 'pvsItem_img',
					container_title: 'pvsItem_n',
					prefix: 'pvs',
					c_type: 'Pvs'
				};
				console.log('found: PPVSports cache');
				//console.dir(obj);
				finished();
			}
		} else {
			objPPVS = {
				remove: 'grdPPVSports_Container'
			};
			finished();
		} 
		
		if (req.body.music == 'true') {
			var obj;
			obj = myCache.get("MusicBin");
			if (__.isEmpty(obj)) {
				getMusic();
			} else {
				objMusic = {
					obj: obj.MusicBin.objList.obj,
					bin_name: 'grdMusic',
					section_head: '(Mostly) Live Music',
					container: 'grdMusic_Container',
					container_name: 'mscItem_container',
					container_img: 'mscItem_img',
					container_title: 'mscItem_n',
					prefix: 'msc',
					c_type: 'Msc'
				};
				console.log('found: Music cache');
				//console.dir(obj);
				finished();
			}
		} else {
			objMusic = {
				remove: 'grdMusic_Container'
			};
			finished();
		}
		
		if (req.body.dnm == 'true') {
			var obj;
			obj = myCache.get("DateNightBin");
			if (__.isEmpty(obj)) {
				getDateNight();
			} else {
				objDNM = {
					obj: obj.DateNightBin.objList.obj,
					bin_name: 'grdDateNight',
					section_head: 'Date Night Movies',
					container: 'grdDateNight_Container',
					container_name: 'dnmItem_container',
					container_img: 'dnmItem_img',
					container_title: 'dnmItem_n',
					prefix: 'dnm',
					c_type: 'Dnm'
				};
				console.log('found: Date Night cache');
				//console.dir(obj);
				finished();
			}
		} else {
			objDNM = {
				remove: 'grdDateNight_Container'
			};
			finished();
		}
		
		if (req.body.cmd == 'true') {
			var obj;
			obj = myCache.get("ComedyBin");
			if (__.isEmpty(obj)) {
				getComedy();
			} else {
				objCMD = {
					obj: obj.ComedyBin.objList.obj,
					bin_name: 'grdComdey',
					section_head: 'Comedy',
					container: 'grdComdey_Container',
					container_name: 'cmdItem_container',
					container_img: 'cmdItem_img',
					container_title: 'cmdItem_n',
					prefix: 'cmd',
					c_type: 'Cmd'
				};
				console.log('found: Comedy cache');
				//console.dir(obj);
				finished();
			}
		} else {
			objCMD = {
				remove: 'grdComdey_Container'
			};
			finished();
		}
		
		if (req.body.ana == 'true') {
			var obj;
			obj = myCache.get("ActionAdventureBin");
			if (__.isEmpty(obj)) {
				getActionAdventure();
			} else {
				objANA = {
					obj: obj.ActionAdventureBin.objList.obj,
					bin_name: 'grdActionAdventure',
					section_head: 'Action & Adventure',
					container: 'grdActionAdventure_Container',
					container_name: 'anaItem_container',
					container_img: 'anaItem_img',
					container_title: 'anaItem_n',
					prefix: 'ana',
					c_type: 'Ana'
				};
				console.log('found: Action & Adventure cache');
				//console.dir(obj);
				finished();
			}
		} else {
			objANA = {
				remove: 'grdActionAdventure_Container'
			};
			finished();
		}
		
		if (req.body.nwr == 'true') {
			var obj;
			obj = myCache.get("NewReleasesBin");
			if (__.isEmpty(obj)) {
				getNewReleases();
			} else {
				objNWR = {
					obj: obj.NewReleasesBin.objList.obj,
					bin_name: 'grdNewReleases',
					section_head: 'New Releases',
					container: 'grdNewReleases_Container',
					container_name: 'nwrItem_container',
					container_img: 'nwrItem_img',
					container_title: 'nwrItem_n',
					prefix: 'nwr',
					c_type: 'Nwr'
				};
				console.log('found: New Releases cache');
				//console.dir(obj);
				finished();
			}
		} else {
			objNWR = {
				remove: 'grdNewReleases_Container'
			};
			finished();
		}
		
		if (req.body.doc == 'true') {
			var obj;
			obj = myCache.get("DocumentaryBin");
			if (__.isEmpty(obj)) {
				var list = "548cff302cfc570b00b827b2;54aac0e7959b1f0b00f53a56;54a331463e43f50b00f9a2e9;54aac13b959b1f0b00f53a57;54aac246959b1f0b00f53a5b;";
				list += "54aac16f959b1f0b00f53a58;547f6e997da9460b00f1700a;54aac1c6959b1f0b00f53a59;54aac1e2959b1f0b00f53a5a;54aac280959b1f0b00f53a5c";
				getDocumentary(list);
			} else {
				objDoc = {
					obj: obj.DocumentaryBin.objList.obj,
					bin_name: 'grdDocumentary',
					section_head: 'Documentaries',
					container: 'grdDocumentary_Container',
					container_name: 'docItem_container',
					container_img: 'docItem_img',
					container_title: 'docItem_n',
					prefix: 'doc',
					c_type: 'Doc'
				};
				console.log('found: Documentary cache');
				//console.dir(obj);
				finished();
			}			
		} else {
			objDoc = {
				remove: 'grdDocumentary_Container'
			};
			finished();
		}
		
		if (req.body.hbo == 'true') {
			var obj;
			obj = myCache.get("HBOBin");
			if (__.isEmpty(obj)) {
				var list = "54aae27a43d6a698204c7629;54aae2de43d6a698204c762b;54aae2b243d6a698204c762a;5475f3c5872afd8825d90f75;54aae42c43d6a698204c762c;";
				list += "54aae47043d6a698204c762d;54aae49843d6a698204c762e;5488b1cb9366810b003762e7;5490dfb103d0750b0083fe64;54aae55e43d6a698204c762f;";
				list += "5487837ce36af90b00570f88;547c009591c56b0b0081242f;54a372163e43f50b00f9a2f9;54aae5e643d6a698204c7630;54aae65d43d6a698204c7631;";
				list += "54aae67f43d6a698204c7632;54aae6a043d6a698204c7633;54aae6ca43d6a698204c7634;54aae6fc43d6a698204c7635;54aae71843d6a698204c7636";
				getHBO(list);
			} else {
				objHBO = {
					obj: obj.HBOBin.objList.obj,
					bin_name: 'grdHBO',
					section_head: 'Premiere Television',
					container: 'grdHBO_Container',
					container_name: 'hboItem_container',
					container_img: 'hboItem_img',
					container_title: 'hboItem_n',
					prefix: 'hbo',
					c_type: 'Hbo'
				};
				console.log('found: HBO cache');
				//console.dir(obj);
				finished();
			}
		} else {
			objHBO = {
				remove: 'grdHBO_Container'
			};
			finished();
		}
		
		if (req.body.sci == 'true') {
			var obj;
			obj = myCache.get("SciFiBin");
			if (__.isEmpty(obj)) {
				var list = "548379c6d5af420b00d752ae;547eab608c003f0b005fb12a;54aaf41284c48698088675a5;549e5f7ff2e2270b00b7ba16;54aaf5eb84c48698088675a6;";
				list += "547f52767da9460b00f17006;54aaf63284c48698088675a7;54907aacb88eab0b00596165;54991981a241440b00c9ffbe;54aaf69d84c48698088675a8;";
				list += "5475edb2dde77394138b8194;54aaf70e84c48698088675aa;54aaf6ed84c48698088675a9;54aaf73b84c48698088675ab;5487d2b6eae11c0b009d7de0;";
				list += "54aaf76884c48698088675ac;54912ad103d0750b0083fe71;54a163af9556370b00c20b57;54aaf7cb84c48698088675ad;54aaf7ed84c48698088675ae";
				getSciFi(list);
			} else {
				objSci = {
					obj: obj.SciFiBin.objList.obj,
					bin_name: 'grdSciFi',
					section_head: 'Science Fiction',
					container: 'grdSciFi_Container',
					container_name: 'sciItem_container',
					container_img: 'sciItem_img',
					container_title: 'sciItem_n',
					prefix: 'sci',
					c_type: 'Sci'
				};
				console.log('found: SciFi cache');
				//console.dir(obj);
				finished();
			}
		} else {
			objSci = {
				remove: 'grdSciFi_Container'
			};
			finished();
		}
		
		if (req.body.adult == 'true') {
			var obj;
			obj = myCache.get("AdultCartoonsBin");
			if (__.isEmpty(obj)) {
				getAdultCartoons();
			} else {
				objAdult = {
					obj: obj.AdultCartoonsBin.objList.obj,
					bin_name: 'grdAdult',
					section_head: 'Adult Cartoons',
					container: 'grdAdult_Container',
					container_name: 'adcItem_container',
					container_img: 'adcItem_img',
					container_title: 'adcItem_n',
					prefix: 'adc',
					c_type: 'Adc'
				};
				console.log('found: Adult Cartoons cache');
				//console.dir(obj);
				finished();
			}
		} else {
			objAdult = {
				remove: 'grdAdult_Container'
			};
			finished();
		}
		
		if (req.body.disney == 'true') {
			var obj;
			obj = myCache.get("DisneyBin");
			if (__.isEmpty(obj)) {
				var list = "54a5fa708547bc0b00a5489d;54aafcd992c2120b00711fc3;54aafb4b92c2120b00711fb8;54aafb5492c2120b00711fb9;54aafb6592c2120b00711fba;";
				list += "5485c6dfb98d8e0b0019a0e1;54aafdbe92c2120b00711fc4;54aafb7292c2120b00711fbb;54aafb8592c2120b00711fbc;54aafb8e92c2120b00711fbd;";
				list += "54aafb9c92c2120b00711fbe;54aafbaf92c2120b00711fbf;54aafbd292c2120b00711fc0;54aafbdc92c2120b00711fc1;54aafbe992c2120b00711fc2";
				getDisney(list);
			} else {
				objDisney = {
					obj: obj.DisneyBin.objList.obj,
					bin_name: 'grdKids',
					section_head: 'Childrens Shows',
					container: 'grdKids_Container',
					container_name: 'kidItem_container',
					container_img: 'kidItem_img',
					container_title: 'kidItem_n',
					prefix: 'kid',
					c_type: 'Kid'
				};
				console.log('found: Disney cache');
				//console.dir(obj);
				finished();
			}
		} else {
			objDisney = {
				remove: 'grdKids_Container'
			};
			finished();
		}
		
	});
	
	mongoose.connect('mongodb://cpkadmin:bballrulz@ds055680.mongolab.com:55680/cpkdevdb1');
});

module.exports = router;