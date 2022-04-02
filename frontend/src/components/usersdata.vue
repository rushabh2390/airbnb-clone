<template>
    <div  class="tdesign">
      <center>
        <table class="table">
          <thead class="thead-light">
            <th scope="col">ObjectID</th>
            <th scope="col">Id</th>
            <th scope="col">Username</th>
            <th scope="col">Role</th>
            <th scope="col">Email</th>
            <th scope="col">Password</th>
            <th scope="col">User Created on</th>
          </thead>
          <tr v-for="items in userslist" v-bind:key="items._id">
            <td>{{items._id}}</td>
            <td>{{items.id}}</td>
            <td>{{items.user_name}}</td>
            <td>{{items.user_role_id.role_name}}</td>
            <td>{{items.user_email}}</td>
            <td>{{items.user_password}}</td>
            <td>{{items.user_Created_at}}</td>

          </tr>
        </table>
      </center>
    </div>
  <br/>
</template>

<script>
//import TODOS from '@/components/todos.vue'
import axios from "axios";
export default {
  name: 'USERDATA',
  components:{
    //TODOS
    },
  data:function () {

    return {
      userslist: [ ],
   }

  },
  mounted() {
    axios("http://localhost:9000/users")
      .then(response => (this.userslist=response.data));
  },
  methods: {}
};

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.tdesign {
  padding-left:10%;
  padding-right:10%;
}
</style>
