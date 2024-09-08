<template>
  <div>
    <form @submit="onSubmit" class="add-form">
      <div class="form-control">
      <label>Dog Name</label>
      <input
        type="text"
        v-model="dogname"
        name="dogname"
        placeholder="enter Dog Name"
      />
    </div>
    <br>
    <div class="form-control">
      <label>Dog DOB</label>
      <input
        type="text"
        v-model="dogdob"
        name="dogdob"
        placeholder="enter Dog DOB"
      />
    </div>
    <br>
    <div class="form-control">
      <label>Dog Weight</label>
      <input
        type="text"
        v-model="dogweight"
        name="dogweight"
        placeholder="enter Dog Weight"
      />
    </div>
    <br>
    <div class="form-control">
      <label>Dog Breed</label>
      <input
        type="text"
        v-model="dogbreed"
        name="dogbreed"
        placeholder="enter Dog Breed"
      />
    </div>
    <br>
    <div class="form-control">
      <label>Dog Gender</label>
      <input
        type="text"
        v-model="doggender"
        name="doggender"
        placeholder="enter Dog Gender"
      />
    </div>
    <br>
    <div class="form-control">
      <label>Date of Last Visit</label>
      <input
        type="text"
        v-model="datelastvisit"
        name="datelastvisit"
        placeholder="enter Date of Last Visit"
      />
    </div>
    <br>
    <div class="form-control">
      <label>Vax Current</label>
      <input
        type="text"
        v-model="vaxcurrent"
        name="vaxcurrent"
        placeholder="enter Vaccine Status"
      />
    </div>
    <br>

      <input type="submit" value="Update Dog" />
    </form>
  </div>
</template>

<script>
export default {
  name: "UpdateDog",
  props: {
    changeDog: Object,
  },
  data() {
    return {
        dogname: this.changeDog.dogname,
        dogdob: this.changeDog.dogdob,
        dogweight: this.changeDog.dogweight,
        dogbreed: this.changeDog.dogbreed, 
        doggender: this.changeDog.doggender, 
        datelastvisit: this.changeDog.datelastvisit, 
        vaxcurrent: this.changeDog.vaxcurrent, 
    };
  },
  methods: {
    onSubmit(e) {
        e.preventDefault();

            const DogID = this.changeDog.DogID;
            const newdogname = 
                    this.dogname == ""
                        ? this.changeDog.dogname
                        : this.dogname;
            const newdogdob =
                    this.dogdob == ""
                        ? this.changeDog.dogdob
                        : this.dogdob;
            const newdogweight = 
                    this.dogweight == null
                        ? this.changeDog.dogweight
                        : this.dogweight;
            const newdogbreed = 
                    this.dogbreed == ""
                        ? this.changeDog.dogbreed
                        : this.dogbreed;
            const newdoggender = 
                    this.doggender == ""
                        ? this.changeDog.doggender
                        : this.doggender;
            const newdatelastvisit = 
                    this.datelastvisit == ""
                        ? this.changeDog.datelastvisit
                        : this.datelastvisit;
            const newvaxcurrent = 
                    this.vaxcurrent == ""
                        ? this.changeDog.vaxcurrent
                        : this.vaxcurrent;

      console.log(
        DogID,
        newdogname,
        newdogdob,
        newdogweight,
        newdogbreed,
        newdoggender,
        newdatelastvisit,
        newvaxcurrent
      );

      this.$emit(
        "update-dog",
        DogID,
        newdogname,
        newdogdob,
        newdogweight,
        newdogbreed,
        newdoggender,
        newdatelastvisit,
        newvaxcurrent
      );
    },
  },
};
</script>

<style scoped></style>