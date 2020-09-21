$(function(){

    var _winWid = document.documentElement.clientWidth || document.body.clientWidth || window.innerWidth;
    var _hgt =  window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    
    //GNB
    var $btn_gnb = $('#nav a.gnb'),
        $gnb_w = $('.nav-wrap'),
        $gnb_li = $gnb_w.find( 'li > a'),
        $gnb_de = $gnb_li.find( 'ul.nav_three'),
        $content = $('.wrap'),
        $search_area = $('.search-area'), //개선_170209 : 추가
        $header = $('#header');
        
    $(window).resize(function(){
        _winWid = document.documentElement.clientWidth || document.body.clientWidth || window.innerWidth;
        _hgt =  window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    });
    
    $(window).scroll(function(){
        var _scrollTop = $(window).scrollTop();
        if (_scrollTop > 10 ){
            $header.addClass('scl');
			$('.sns-banner').addClass('scroll');// 170821 추가 : SNS 플로팅 배너
            $search_area.removeClass('on'); //개선_170209 : 추가
            initSearch(); //개선_170209 : 추가
        } else {
            $header.removeClass('scl');
			$('.sns-banner').removeClass('scroll');// 170821 추가 : SNS 플로팅 배너
        }
    });
    
    $btn_gnb.on('click', function(){
        var $this = $(this),
            _topHgt = 0;
        if (_winWid < 767 ) {
            _topHgt = 50;
        } else {
            _topHgt = 78;
        }

        $(window).scrollTop(0);
        if($header.hasClass('on')){
            $header.removeClass('on');
            $content.css({ 'height' : 'auto' }).removeClass('off');
            $btn_gnb.find('span').text('열기'); //170926 추가
        } else{
            $header.addClass('on');
            $content.css({ 'height' : $gnb_w.height() + _topHgt + 'px' }).addClass('off');
            $search_area.removeClass('on'); //개선_170209 : 추가
            initSearch(); //개선_170209 : 추가
            $btn_gnb.find('span').text('닫기'); //170926 추가
        }
        return false;
    });
    
    /* 171107 수정 */
    $gnb_li.on('click', function(){
        var $this = $(this),
            $parent = $this.parent('li');
        if($parent.find(' ul ').length  != 0){
            if($parent.hasClass('on')){
                $parent.removeClass('on');
            }else {
                $gnb_li.parent('li').removeClass('on'); 
                $parent.addClass('on');
            }
            return false;
        }
    });
    /* //171107 수정 */
    
    //btn search
    $('.m_btn_search').on('click', function() {
        var $this = $(this),
            $parent = $this.closest('div');
        if($parent.hasClass('on')){
            $parent.removeClass('on');
            initSearch(); //개선_170209 : 추가
        } else{
            $parent.addClass('on');
            $("#in_search").click(); //개선_170209 : 추가
        }
    });
    //개선_170120 : 수정
    $('.btn_close').on('click', function () {
        if($(this).parent().parent().parent().hasClass('on')){
            $(this).parent().parent().parent().removeClass('on');
            initSearch(); //개선_170209 : 추가
        } else{
            $(this).parent().parent().parent().addClass('on');
        }
        $("#arkword > li").remove();
        $("#arkword").hide();
    });
    //개선_170120 : 추가
    $('#in_search').bind('click', function(){
//        if($(this).val()=='검색어를 입력하세요'){
//            $(this).val('');
//        }
        initSearch();
    });
    //개선_170209 : 추가  //검색어 초기화
    function initSearch(){
        $('#in_search').val('');
    }

    //main visual
    var MAINVISUAL = (function(){
        if (!$('.box_blur').length) return; //개선_170213 
        var $link = $('.list_link a'),
            _src = '/images/temp/main_vis_02.jpg',
            $blur = $('.box_blur'),
            $video = $('.box_video > .vis'),
            $tag = $video.find('.vis_txt > em '),
            $tit = $video.find('.vis_txt > p.title ');
        
        $link.on('click',function(){
            var $this = $(this),
                $parent = $this.parent(),
                _src = $this.find('img').attr('src'),
                _tag = $this.find('span.thumb_txt').text(),
                _tit = $this.find('span.hidden').text(),
                _idx = $parent.index();
            $video.css({ 'background-image' : 'url(' + _src + ')' });
            $tag.text(_tag);
            $tit.text(_tit);
            $parent.siblings().removeClass('on');
            $parent.addClass('on');
            $blur.backgroundBlur(_src); 
            
            // 업무단에서 반드시 구현, 업무단에서 처리가 필요한 경우 사용
            fn_mainVisualClick();
            
            return false;
        });
        
        $blur.backgroundBlur({
            imageURL : _src,
            blurAmount : 30,
            imageClass : 'bg-blur',
            duration: 1000,
            endOpacity : 1 
        });
        
    })();
    
    var MAINTAB = (function(){
        if (!$('.area_list_link').length) return;
        
        var $base = $('.area_list_link'),
            $box = $base.find('.box_list_link .list_link'),
            $list = $box.find(' > li'),
            _size = $list.size(),
            _pad = 22, //개선_170120 : .box_list_link 패딩값
            _unitSize = 0,
            _temp = false,
            _indicator = '',
            _cur = 0,
            _direct = 1;

        _indicator+= '<ul class="list_arrow">';
        _indicator+= '<li class="li_prev"><a href="#">이전</a></li>';
        _indicator+= '<li class="li_next"><a href="#">다음</a></li>';
        _indicator+= '</ul>';

        reSize();
        
        function reSize(){
            if (_winWid < 767 ) {
                $('.list_arrow').remove(); //개선_170120 : 추가
                setList();
                _temp = true;
            } else {
                _temp = false;
                $list.removeAttr('style');
                $box.removeAttr('style');
                $('.list_arrow').remove();
            }
        }
        
        $(window).resize(function(){
            reSize();
        });
        
        function setList(){
            //if (_temp) return;
            _unitSize = (_winWid - (_pad * 2)) / 3 - 8;  //개선_170120 : .main_vis .list_link li 마진값 (8)
            
            $list.css({ 'width' : _unitSize + 'px' });
            $box.css({ 'width' : (_unitSize + 8) * _size + 'px '}); //개선_170120 : .main_vis .list_link li 마진값 (8)
            $base.append(_indicator);
        }
        $(document).on('click','.list_arrow li a',function(){
            var $this = $(this),
                _idx = $this.parent().index(),
                _left = 0;
            switch(_idx){
                case 0:
                    _cur--;
                    _direct = 1;
                break;
                case 1:
                    _cur++;
                    _direct = -1;
                break;
            }
            
            if (_cur > _size - 1) {
                _cur = _size - 1;
                return false;
            } else if (_cur < 0){
                _cur = 0;
                return false;
            }
            
            _left = _left + ((_unitSize + 8) * _direct * -1 * _cur); //개선_170120 : .main_vis .list_link li 마진값 (8)
        
            $box.css({ '-webkit-transform' : 'translate3d(' + _left * _direct + 'px,0, 0)' ,'transform' : 'translate3d(' + _left * _direct + 'px,0, 0)' , '-webkit-transition' : 'all 0.3s ease' , 'transition' : 'all 0.3s ease' });
            return false;
        });
    })();
    
    // 라이브러리
    var LIBRARY = (function(){
        var $base = $('.box_library'),
            $select = $base.find('.btn_tit_group a'),
            $box = $base.find('.box_group_list'),
            $radio = $box.find('input[type=radio]'),
            $close = $box.find('.link_close'),
            $all = $box.find('.link_all'),
            $boxUnit = $box.find('.box_unit'),
            _boxSize = $boxUnit.size();
        
        $select.on('click',function(){
            var $this = $(this),
                $parent = $this.closest('.box_library');
            if ($parent.hasClass('on')){
                $parent.removeClass('on');
                $box.slideUp(200);
            } else {
                $parent.addClass('on');
                $box.slideDown(200);
            }
            return false;
        });
        
        // 라디오 선택
        $radio.on('change',function(){
            var $this = $(this),
                _val = $this.val(),
                _label = $this.siblings('label').text();
            $base.removeClass('on');
            $select.text(_label);
            $box.slideUp(200);
        });
        
        // 전체보기 버튼
        $all.on('click',function(){
            var $this = $(this),
                _txt = $this.text();
            $base.removeClass('on');
            $select.text(_txt);
            $box.slideUp(200);
        });
        
        // 닫기 버튼
        $close.on('click',function(){
            $base.removeClass('on');
            $box.slideUp(200);
        });
        
        // 리사이즈
        $(window).resize(function(){
            clearTimeout(resizeEvt);
            var resizeEvt = setTimeout(function() {
                if (_winWid > 768){
                    $box.find('.box_unit').css({ 'width' : 100 /_boxSize + '%' });
                } else {
                    $box.find('.box_unit').removeAttr('style');
                }
            }, 200);
        });
        
    })();
    
    // 카테고리
    var CATEGORY = (function(){
        if (!$('.box_group_category').length) return;
        var $base = $('.box_group_category'),
            $list = $base.find('.list_group_category'),
            _current = $list.find('li.on').text(),
            _temp = false;
        
        setCategory();
        
        $(window).resize(function(){
            if (_winWid < 560){
                setCategory();
            } else {
                _temp = false;
                $base.removeClass('mo');
                $base.find('.p_current').remove();
            }
        });
        
        function setCategory(){
            if (_temp || _winWid > 560) return;
            _temp = true;
            $base.addClass('mo');
            $base.prepend('<p class="p_current"><a href="#">' + _current + '</a></p>');
        }
        
        $(document).on('click','.box_group_category .p_current a',function(){
            if ($base.hasClass('on')){
                $base.removeClass('on');
            } else {
                $base.addClass('on');
            }
            return false;
        });
        
    })();
    
    // select 박스 기본
    var SELECT = (function(){
        var $select = $('select'),
            _scrollTop = 0,
            _winHgt = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight,
            _offset = 0,
            _sur = 0,
            _temp = false,
            _upTemp = false;
        
        $select.each(function(){
            selectAdd($(this));
        });
        
        //열기 버튼
        $(document).on('click','.btn_select',function(){
            var $this = $(this),
                $top = $this.closest('.select_wrap'),
                _id = $top.attr('class'),
                $ul = $top.find('.ul_select_list'),
                _top = 0;
            
            var _size = $ul.find('li').size(),
                _liHgt = $ul.find('li').height(),
                _ulHgt = _size * _liHgt;
            
            _offset = $top.offset().top - _scrollTop;
            closeSelect(_id);
            
            // 위로 아래로 열리는 방향 설정
            if (_winHgt - _offset < _winHgt / 2 && _ulHgt > _winHgt - _offset){
                _upTemp = true;
                $ul.addClass('up');
            } else {
                _upTemp = false;
                $ul.removeClass('up');
            }
            
            // 리사이즈시 높이값
            if (_winHgt < _offset + _ulHgt + 40 && !_upTemp){
                _top = _ulHgt - ((_offset + _ulHgt) - winHgt + 51);
            } else if ( _offset < _ulHgt && _upTemp ){
                if (_winHgt - offset > _ulHgt )return;
                _top = _offset - 20;
            } else {
                _top = _ulHgt;
            }
            
            if ($top.hasClass('on')){
                $ul.animate({ 'height' : '0' },200,function(){
                    $top.removeClass('on');
                    //$ul.css({ 'display' : 'none' });
                });
                _temp = false;
            } else {
                $top.addClass('on');
                $ul.css({ 'display' : 'block' }).animate({ height : (_top + 1) + 'px' },200);
                _temp = true;
            }
            
            return false;
        });
        
        //옵션선택
        $(document).on('click','.ul_select a',function(){
            var $this = $(this),
                $top = $this.closest('.select_wrap'),
                $input = $top.find('.btn_select'),
                $ul = $top.find('.ul_select_list'),
                $openBtn = $top.find('.btn_select'),
                $select = $top.prev('select'),
                _val = $this.val(),
                _txt = $this.text(),
                _idx = $this.parent().index();
            
            $ul.find('li').removeClass('on');
            $this.parent().addClass('on');
            
            // select 선택
            $select.find('option').attr('selected',false);
            $select.find('option').eq(_idx).attr('selected',true).change();
            
            //상단 데이터 넣기
            $input.attr('href',_val).text(_txt);
            
            //닫기
            if ($top.hasClass('spread')){
                $this.css({ 'display' : 'block' });
                return false;
            } else {
                closeSelect();
            }
            
            $openBtn.focus();
            
            return false;
        });
        
        // 전체닫기
        $(document).on('click',function(){
            if ($('.select_wrap').hasClass('spread')){
                $(this).css({ 'display' : 'block' });
                return false;
            } else {
                closeSelect();
            }
        });
        
        // 리사이즈
        if ($('.select').length){
            $(window).resize(function(){
                _winHgt = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
                _offset = $select.offset().top;
            });
        };
        
        // 닫기 함수
        function closeSelect(other){
            var $target = $('.select_wrap'),
                _size = 0;
            _size = $('.select_wrap').size();
            
            for (var i = 0; i < _size; i++){
                var _id = $target.eq(i).attr('class');
                if (other === _id) continue;
                $target.eq(i).removeClass('on');
                $target.eq(i).find('.ul_select_list').css({ 'height' : '0' });
            }
            
            _temp = false;
        }
        
        $(document).on('focus, keydown','.select_wrap .btn_select',openKey);
        
        // 방향키로 선택
        function openKey(e){
            var $this = $(this),
                $ul = $this.closest('.select_wrap').find('.ul_select_list'),
                $li = $ul.find('li'),
                _size = $li.size(),
                _cur = 0;
            
            if (e.keyCode == 40 || e.keyCode == 38 || e.keyCode == 32){ // 화살표 아래, 위, 스페이스바 누를 경우
                e.preventDefault();
            }
            
            if (_temp) return;
            
            if ($li.filter('.on').size() > 0){
                _cur = $li.filter('.on').index();
            }
            
            switch (e.keyCode){
                case 38:
                    _cur--;
                break;
                case 40:
                    _cur++;
                break;
            }
            
            if (_cur > _size - 1){
                _cur = _size -1;
            } else if (_cur < 0 ){
                _cur = 0;
            }
            
            $li.eq(_cur).find('a').trigger('click');
        }
        
    })();
});

// select option 추가
function optionAdd(target,val,text){
    var $target = $(target),
        _class = '.select_wrap.' + target.split('#')[1];
    
    $target.append('<option value="' + val + '">' + text + '</option>');
    $(_class).find('ul').append('<li><a href="#' + text + '">' + text + '</a></li>');
}

// select 박스 전체 추가
function selectAdd(target){
    var $target = this;
    
    if (target.length) $target = $(target);
    
    var $option = $target.find('option'),
        _size = $option.size(),
        _id = $target.attr('id'),
        _class = $target.attr('class'),
        _val = '',
        _txt = '',
        _wrap = '',
        _arr = [],
        _selected = 0;
    
    if (_class == undefined){
        _class = '';
    }
    
    // 초기 selected
    // if ($option.filter(':selected'))
    for (var i = 0; i < _size; i++){
        _val = $option.eq(i).val();
        _txt = $option.eq(i).text();
        
        if ($option.eq(i).attr('selected') == 'selected'){
            _selected = i;
        }
        
        _arr.push([_val,_txt]);
    }
    
    _wrap += '<div class="select_wrap ' + _id + ' ' + _class + '">';
    if (_selected == 0){
        _wrap  += '<p><a href="#wrap" class="btn_select">' + _arr[0][1] + '</a></p>';
    } else {
        _wrap  += '<p><a href="#wrap" class="btn_select">' + _arr[_selected][1] + '</a></p>';
    }
    _wrap += '<div class="ul_select_list">';
    _wrap += '<ul class="ul_select">';
    
    for (var i in _arr){
        if (i == _selected) _wrap += '<li class="on"><a href="#' + _arr[i][0] + '">' + _arr[i][1] + '</a></li>';
        else  _wrap += '<li><a href="#' + _arr[i][0] + '">' + _arr[i][1] + '</a></li>';
    }    
    _wrap += '</ul>';
    _wrap += '</div>';
    _wrap += '</div>';
    
    $target.after(_wrap);
}

// selefct option 전체 교체
function selectChange(target){
    var $target = $(this);
    
    if (target) $target = $(target);
    
    var _class = '.select_wrap.' + target.split('$')[1],
        $ul = $(_class).find('.ul_select_list'),
        $option = $target.find('option'),
        _size = $option.size(),
        _val = '',
        _txt = '',
        _wrap = '',
        _arr = [];
    
    if (_class == undefined){
        _class = '';
    }
    
    for (var i = 0; i < _size; i++){
        _val = $option.eq(i).val();
        _txt = $option.eq(i).text();
        _arr.push([_val,_txt]);
    }
    
    for (var i in _arr){
        _wrap += '<li><a href="#' + _arr[i][0] + '">' + _arr[i][1] + '</a></li>';
    }
    
    $(_class).find('p').html('<a href="#wrap" class="btn_select">' + _arr[0][1] + '</a></p>');
    $ul.html('').append(_wrap);
}