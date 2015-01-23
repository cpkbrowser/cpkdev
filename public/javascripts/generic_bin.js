function get_GenericBin() {
	var myString = (function () {/*
<div id="xyzBIN_NAMEzyx" style="display: block;">
	<div class="section">
		<h4 class="section-head">xyzSECTION_HEADzyx</h4>
		<hr class="section">
	</div>
	<div class="row">
		<div id="xyzCONTAINER_NAMEzyx0" class="col-md-2 col-sm-4 col-xs-6">
			<div class="vid-hover">
				<div class="video-box">
					<a class="vid-link" onclick="onClick_Img(this);"> <img id="xyzCONTAINER_IMGzyx0" class="vid-thumb-img img-point" src="/images//placeholder.png">
					</img></a>
					<div class="description">
						<h2 class="title" id="xyzCONTAINER_TITLEzyx0">Title of Movie or Episode</h2>
					</div>
					<div class="row">
						<div class="col-xs-6 button-span">
							<div class="btn-primary btn-props" onclick="open_mdlInfo(this, 'false');" type="button" id="xyzPREFIXzyx_dropdownMenu0">
								<div id="xyzPREFIXzyxItem_btnInfo0" class="btn-primary-txt">Info
								</div>
								<div id="xyzPREFIXzyxItem_hdnDiv0" style="display: none;">
									<p id="xyzPREFIXzyxItem_hdnName0"></p>
									<p id="xyzPREFIXzyxItem_hdnImg0"></p>
									<p id="xyzPREFIXzyxItem_hdnDesc0"></p>
									<p id="xyzPREFIXzyxItem_hdnGenre0"></p>
									<p id="xyzPREFIXzyxItem_hdnYear0"></p>
									<p id="xyzPREFIXzyxItem_hdnLink0"></p>
									<p id="xyzPREFIXzyxItem_hdnType0"></p>
									<p id="xyzPREFIXzyxItem_hdnActors0"></p>
								</div>										
							</div>
						</div>
						<div class="col-xs-6 button-span">
							<div id="xyzPREFIXzyxItem_btnFav0" onclick="send_cpkFavData(this);" style="text-align:center;padding:2px;" class="btn-primary addtofav">
								<a style="cursor: pointer;">
									+Favs
								</a>
							</div>
						</div> 
					</div>
				</div>
			</div>
		</div>
		<div id="xyzCONTAINER_NAMEzyx1" class="col-md-2 col-sm-4 col-xs-6">
			<div class="vid-hover">
				<div class="video-box">
					<a class="vid-link" onclick="onClick_Img(this);"> <img id="xyzCONTAINER_IMGzyx1" alt="No Image Found" class="vid-thumb-img img-point" src="/images//placeholder.png">
					</img></a>
					<div class="description">
						<h2 class="title" id="xyzCONTAINER_TITLEzyx1">Title of Movie or Episode</h2>
					</div>
					<div class="row">
						<div class="col-xs-6 button-span">
							<div class="btn-primary btn-props" onclick="open_mdlInfo(this, 'false');" type="button" id="xyzPREFIXzyx_dropdownMenu1">
								<div id="xyzPREFIXzyxItem_btnInfo1" class="btn-primary-txt">Info
								</div>
								<div id="xyzPREFIXzyxItem_hdnDiv1" style="display: none;">
									<p id="xyzPREFIXzyxItem_hdnName1"></p>
									<p id="xyzPREFIXzyxItem_hdnImg1"></p>
									<p id="xyzPREFIXzyxItem_hdnDesc1"></p>
									<p id="xyzPREFIXzyxItem_hdnGenre1"></p>
									<p id="xyzPREFIXzyxItem_hdnYear1"></p>
									<p id="xyzPREFIXzyxItem_hdnLink1"></p>
									<p id="xyzPREFIXzyxItem_hdnType1"></p>
									<p id="xyzPREFIXzyxItem_hdnActors1"></p>
								</div>
							</div>
						</div>
						<div class="col-xs-6 button-span">
							<div id="xyzPREFIXzyxItem_btnFav1" onclick="send_cpkFavData(this);" style="text-align:center;padding:2px;" class="btn-primary addtofav">
								<a style="cursor: pointer;">
									+Favs
								</a>
							</div>
						</div> 
					</div>
				</div>
			</div>
		</div>
		<div id="xyzCONTAINER_NAMEzyx2" class="col-md-2 col-sm-4 col-xs-6">
			<div class="vid-hover">
				<div class="video-box">
					<a class="vid-link" onclick="onClick_Img(this);"> <img id="xyzCONTAINER_IMGzyx2" alt="No Image Found" class="vid-thumb-img img-point" src="/images//placeholder.png">
					</img></a>
					<div class="description">
						<h2 class="title" id="xyzCONTAINER_TITLEzyx2">Title of Movie or Episode</h2>
					</div>
					<div class="row">
						<div class="col-xs-6 button-span">
							<div class="btn-primary btn-props" onclick="open_mdlInfo(this, 'false');" type="button" id="xyzPREFIXzyx_dropdownMenu2">
								<div id="xyzPREFIXzyxItem_btnInfo2" class="btn-primary-txt">Info
								</div>
								<div id="xyzPREFIXzyxItem_hdnDiv2" style="display: none;">
									<p id="xyzPREFIXzyxItem_hdnName2"></p>
									<p id="xyzPREFIXzyxItem_hdnImg2"></p>
									<p id="xyzPREFIXzyxItem_hdnDesc2"></p>
									<p id="xyzPREFIXzyxItem_hdnGenre2"></p>
									<p id="xyzPREFIXzyxItem_hdnYear2"></p>
									<p id="xyzPREFIXzyxItem_hdnLink2"></p>
									<p id="xyzPREFIXzyxItem_hdnType2"></p>
									<p id="xyzPREFIXzyxItem_hdnActors2"></p>
								</div>
							</div>
						</div>
						<div class="col-xs-6 button-span">
							<div id="xyzPREFIXzyxItem_btnFav2" onclick="send_cpkFavData(this);" style="text-align:center;padding:2px;" class="btn-primary addtofav">
								<a style="cursor: pointer;">
									+Favs
								</a>
							</div>
						</div> 
					</div>
				</div>								
			</div>
		</div>
		<div id="xyzCONTAINER_NAMEzyx3" class="col-md-2 col-sm-4 col-xs-6">
			<div class="vid-hover">
				<div class="video-box">
					<a class="vid-link" onclick="onClick_Img(this);"> <img id="xyzCONTAINER_IMGzyx3" alt="No Image Found" class="vid-thumb-img img-point" src="/images//placeholder.png">
					</img></a>
					<div class="description">
						<h2 class="title" id="xyzCONTAINER_TITLEzyx3">Title of Movie or Episode</h2>
					</div>
					<div class="row">
						<div class="col-xs-6 button-span">
							<div class="btn-primary btn-props" onclick="open_mdlInfo(this, 'false');" type="button" id="xyzPREFIXzyx_dropdownMenu3">
								<div id="xyzPREFIXzyxItem_btnInfo3" class="btn-primary-txt">Info
								</div>
								<div id="xyzPREFIXzyxItem_hdnDiv3" style="display: none;">
									<p id="xyzPREFIXzyxItem_hdnName3"></p>
									<p id="xyzPREFIXzyxItem_hdnImg3"></p>
									<p id="xyzPREFIXzyxItem_hdnDesc3"></p>
									<p id="xyzPREFIXzyxItem_hdnGenre3"></p>
									<p id="xyzPREFIXzyxItem_hdnYear3"></p>
									<p id="xyzPREFIXzyxItem_hdnLink3"></p>
									<p id="xyzPREFIXzyxItem_hdnType3"></p>
									<p id="xyzPREFIXzyxItem_hdnActors3"></p>
								</div>
							</div>
						</div>
						<div class="col-xs-6 button-span">
							<div id="xyzPREFIXzyxItem_btnFav3" onclick="send_cpkFavData(this);" style="text-align:center;padding:2px;" class="btn-primary addtofav">
								<a style="cursor: pointer;">
									+Favs
								</a>
							</div>
						</div> 
					</div>
				</div>
			</div>
		</div>
		<div id="xyzCONTAINER_NAMEzyx4" class="col-md-2 col-sm-4 col-xs-6">
			<div class="vid-hover">
				<div class="video-box">
					<a class="vid-link" onclick="onClick_Img(this);"> <img id="xyzCONTAINER_IMGzyx4" alt="No Image Found" class="vid-thumb-img img-point" src="/images//placeholder.png">
					</img></a>
					<div class="description">
						<h2 class="title" id="xyzCONTAINER_TITLEzyx4">Title of Movie or Episode</h2>
					</div>
					<div class="row">
						<div class="col-xs-6 button-span">
							<div class="btn-primary btn-props" onclick="open_mdlInfo(this, 'false');" type="button" id="xyzPREFIXzyx_dropdownMenu4">
								<div id="xyzPREFIXzyxItem_btnInfo4" class="btn-primary-txt">Info
								</div>
								<div id="xyzPREFIXzyxItem_hdnDiv4" style="display: none;">
									<p id="xyzPREFIXzyxItem_hdnName4"></p>
									<p id="xyzPREFIXzyxItem_hdnImg4"></p>
									<p id="xyzPREFIXzyxItem_hdnDesc4"></p>
									<p id="xyzPREFIXzyxItem_hdnGenre4"></p>
									<p id="xyzPREFIXzyxItem_hdnYear4"></p>
									<p id="xyzPREFIXzyxItem_hdnLink4"></p>
									<p id="xyzPREFIXzyxItem_hdnType4"></p>
									<p id="xyzPREFIXzyxItem_hdnActors4"></p>
								</div>
							</div>
						</div>
						<div class="col-xs-6 button-span">
							<div id="xyzPREFIXzyxItem_btnFav4" onclick="send_cpkFavData(this);" style="text-align:center;padding:2px;" class="btn-primary addtofav">
								<a style="cursor: pointer;">
									+Favs
								</a>
							</div>
						</div> 
					</div>
				</div>
			</div>
		</div>
		<div id="xyzCONTAINER_NAMEzyx5" class="col-md-2 col-sm-4 col-xs-6">
			<div class="vid-hover">
				<div class="video-box">
					<a class="vid-link" onclick="onClick_Img(this);"> <img id="xyzCONTAINER_IMGzyx5" alt="No Image Found" class="vid-thumb-img img-point" src="/images//placeholder.png">
					</img></a>
					<div class="description">
						<h2 class="title" id="xyzCONTAINER_TITLEzyx5">Title of Movie or Episode</h2>
					</div>
					<div class="row">
						<div class="col-xs-6 button-span">
							<div class="btn-primary btn-props" onclick="open_mdlInfo(this, 'false');" type="button" id="xyzPREFIXzyx_dropdownMenu5">
								<div id="xyzPREFIXzyxItem_btnInfo5" class="btn-primary-txt">Info
								</div>
								<div id="xyzPREFIXzyxItem_hdnDiv5" style="display: none;">
									<p id="xyzPREFIXzyxItem_hdnName5"></p>
									<p id="xyzPREFIXzyxItem_hdnImg5"></p>
									<p id="xyzPREFIXzyxItem_hdnDesc5"></p>
									<p id="xyzPREFIXzyxItem_hdnGenre5"></p>
									<p id="xyzPREFIXzyxItem_hdnYear5"></p>
									<p id="xyzPREFIXzyxItem_hdnLink5"></p>
									<p id="xyzPREFIXzyxItem_hdnType5"></p>
									<p id="xyzPREFIXzyxItem_hdnActors5"></p>
								</div>
							</div>
						</div>
						<div class="col-xs-6 button-span">
							<div id="xyzPREFIXzyxItem_btnFav5" onclick="send_cpkFavData(this);" style="text-align:center;padding:2px;" class="btn-primary addtofav">
								<a style="cursor: pointer;">
									+Favs
								</a>
							</div>
						</div> 
					</div>
				</div>
			</div>
		</div>
	</div><!--end of row-->		
	<div id="xyzBIN_NAMEzyx_MoreItems">
		<div id="xyzPREFIXzyxItem_getMore" onclick="getMore_Click(this);" style="cursor: pointer;" class="more-arrow">
			<p><i class="fa fa-chevron-circle-left"></i></p>
		</div>
		<div id="xyzPREFIXzyxItem_getLess" onclick="getLess_Click(this);" style="cursor: pointer;" class="more-arrow">
			<p><i class="fa fa-chevron-circle-right"></i></p>
		</div>
		<p id="hdnxyzC_TYPEzyxSetCounter" style="display: none;">0</p>
		<p id="hdnxyzC_TYPEzyxSetLoaded" style="display: none;">true</p>
		<p id="hdnxyzC_TYPEzyxSetMax" style="display: none;">0</p>
	</div>
</div>*/
	});
	
	return myString.toString().replace(/^[^\/]+\/\*!?/, '').replace(/\*\/[^\/]+$/, '');
}