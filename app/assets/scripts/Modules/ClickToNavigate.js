import $ from 'jquery';
import smoothScroll from 'jquery-smooth-scroll';

class ClickToNavigate {
    constructor() {
        this.link= $(".navigation__link");
        this.checkbox= $(".navigation__icon");
        this.allLinks= $('a[href="#"]');
        this.events();
        this.smoothScrolling();
    }
    smoothScrolling(){
        this.link.smoothScroll();
    }
    events() {
        this.link.click(this.boxChecked.bind(this)); 
        this.allLinks.click(this.noDefault.bind(this));
    }
    boxChecked(){
        this.checkbox.click();
    }
    noDefault(){
        return false;
    }
}

export default ClickToNavigate;