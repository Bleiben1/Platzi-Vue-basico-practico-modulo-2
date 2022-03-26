new Vue({
  el: '#app',
  data () {
    return {
      courses: [],
      title: '',
      time: '',
      showSave: false,
      inputError: false,
      formatError: false,
    }
  },
  methods: {
    // OPTIMIZE: is it possible to simplify this method?
    addNewCourse () {
      if (!this.inputError) {
        if (!this.showSave) {
          this.showSave = true;
        } else if (this.title && this.time || !this.title && !this.time) {
          this.showSave = false;
          this.inputError = false;
        } else this.inputError = true;
      } 
      if (this.title && this.time) {
        this.inputError = false;
        if (this.time.match(/^[0-9:]+$/)) {
          this.formatError = false;
          this.showSave = false;
          this.courses.push({
            title: this.title,
            time: timeAmount.setTime(this.time),
          });
          this.title = '';
          this.time = '';
        } else this.formatError = true;
      }
    }
  },
  computed: {
    totalTime(){
      let totalTime =  this.courses.reduce((total, course) => {
        return timeAmount.sumTime(total, course.time);
      }, 0);
      return timeAmount.setTime(totalTime);
    },
    totalCourses(){
      return this.courses.length;
    }
  },
  watch: {
    
  }
})

/**
 * allow to work with amounts of time
 */
const timeAmount = {
  hour: "h",
  minute: "m",
  second: "s",

  setTime(timeString){
    let time = timeString.split(':');
    this.hour = time[0];
    time[1] ? this.minute = time[1] : this.minute = 0;
    time[2] ? this.second = time[2] : this.second = 0;
    return this.getTime();
  },

  getTime(){
    return (this.hour + ":" + ("0" + this.minute).slice(-2) + ":" + ("0" + this.second).slice(-2));
  },

  sumTime(time1, time2){
    let time1Array = time1.toString().split(':');
    let time2Array = time2.toString().split(':');
    let hour = parseInt(time1Array[0]) + parseInt(time2Array[0]);
    let minute = parseInt(time2Array[1]);
    if (time1Array[1]) minute += parseInt(time1Array[1]);
    let second = parseInt(time2Array[2]);
    if (time1Array[2]) second += parseInt(time1Array[2]);

    if (second > 59) {
      second -= 60;
      minute += 1;
    } !second ? second = 0 : second;

    if (minute > 59) {
      minute -= 60;
      hour += 1;
    } !minute ? minute = 0 : minute;

    return this.setTime(hour + ":" + minute + ":" + second);
  }

}