<template>
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
    <input type="submit" value="Add Dog" />
  </form>
</template>

<script>
export default {
  name: "AddDog",
  data() {
    return {
        dogname: "",
        dogdob: "",
        dogweight: "",
        dogbreed: "", 
        doggender: "", 
        datelastvisit: "", 
        vaxcurrent: "",
    };
  },
  methods: {
    onSubmit(e) {
      e.preventDefault();

      if (!this.dogname) {
        alert("Please add a Dog Name");
        return;
      }
      if (!this.dogdob) {
        alert("Please add a Dog DOB (DD-MM-YY)");
        return;
      }
      if (!this.dogweight) {
        alert("Please add a Dog Weight (lbs)");
        return;
      }
      if (!this.dogbreed) {
        alert("Please add a Dog Breed");
        return;
      }
      if (!this.doggender) {
        alert("Please add a Dog Gender (M or F)");
        return;
      }
      if (!this.datelastvisit) {
        alert("Please add a Dog Name (DD-MM-YY)");
        return;
      }
      if (!this.vaxcurrent) {
        alert("Please add a Dog Name (Y or N)");
        return;
      }

      const newdog= {
        dogname: this.dogname,
        dogdob: this.dogdob,
        dogweight: this.dogweight,
        dogbreed: this.dogbreed, 
        doggender: this.doggender, 
        datelastvisit: this.datelastvisit, 
        vaxcurrent: this.vaxcurrent
      };

      this.$emit("add-dog", newdog);

      (this.dogname = ""),
      (this.dogdob = ""),
      (this.dogweight = ""),
      (this.dogbreed = ""),
      (this.doggender = ""),
      (this.datelastvisit = ""),
      (this.vaxcurrent = "");
    },
  },
};
</script>

<style scoped>
.add-form {
  max-width: 100px;
  margin-top: 100px;
  padding: 3px auto;
  font-size: 20px;
}
.form-control input {
  border: 1px black;
}
</style>
