new Vue({
  el: '#app',
  data () {
    return {
      courses: [],
      title: '',
      time: '',
      showSave: false,
      inputError: false,
    }
  },
  methods: {
    // OPTIMIZE: is it possible to simplify this method?
    addNewCourse () {
      if (!this.inputError){
        console.log('no error');
        if (!this.showSave) {
          this.showSave = true;
          console.log('save');
        } else if (this.title && this.time) {
          this.showSave = false;
          this.inputError = false;
          console.log('cancel');
        } else this.inputError = true;
      } 
      if (this.title && this.time) {
        console.log('add new course');
        this.inputError = false;
        this.showSave = false;
        this.courses.push({
          title: this.title,
          time: this.time
        });
        this.title = '';
        this.time = '';
      }
    }
  },
  computed: {
    // FIX: correct this method to work with time
    totalTime(){
      let totalTime =  this.courses.reduce((total, course) => {
        return total + parseInt(course.time);
      }, 0);
      return totalTime;
    },
    totalCourses(){
      return this.courses.length;
    }
  },
  watch: {
    
  }
})