<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <form class="form">
          <div class="form-group mb-2">
            <label for="seacrhInputPlace"><h3>Serach places: </h3></label><br/>
            <input class="form-control" type="text" id="seacrhInputPlace" v-model="placename">
          </div>
        </form>
      </div>
      <div class="col">
        <h3>Total Items</h3>
        {{totalitems}}
      </div>
      <div class="col">
        <h3>Total page</h3>
          {{totalPages}}
      </div>
    </div>
    <div class="row">
      <div class="col">
          <div v-if="totalPages<10">
            <nav aria-label="Page navigation">
              <ul class="pagination">
                <li class="page-item" >
                  <a class="page-link"  :disabled="(currentPage==1)" href="#" @click="(currentPage==1)? setPage(1) :setPage((currentPage-1))">Previous</a>
                </li>
                <li class="page-item"  v-for="pageNumber in totalPages"  v-bind:key="pageNumber" v-bind:class="{'page-item':true, 'active':(pageNumber == currentPage)}" >
                    <a class="page-link" href="#" @click="setPage(pageNumber)" v-bind:class="{'page-item':true, 'active':(pageNumber   === currentPage)}">{{pageNumber}}</a>
                </li>
                <li class="page-item">
                  <a class="page-link" href="#" @click="(currentPage === totalPages)? setPage(currentPage) :setPage((currentPage+1))">Next</a>
                </li>
              </ul>
            </nav>
            </div>
            <div v-else>
              <nav aria-label="Page navigation">
                <ul class="pagination">
                  <li class="page-item">
                    <a class="page-link" href="#" @click="setPage(1)">First</a>
                  </li>
                  <li class="page-item">
                    <a class="page-link" href="#" @click="(currentPage==1)? setPage(1) :setPage((currentPage-1))">Previous</a>
                  </li>
                  <li class="page-item"  v-for="pageNumber in pagechunk"  v-bind:key="pageNumber" v-bind:class="{'page-item':true, 'active':(pageNumber == currentPage)}" >
                      <a class="page-link" href="#" @click="setPage(pageNumber)" v-bind:class="{'page-item':true, 'active':(pageNumber   === currentPage)}">{{pageNumber}}</a>
                  </li>
                  <li class="page-item">
                    <a class="page-link" href="#" @click="(currentPage === totalPages)? setPage(currentPage) :setPage((currentPage+1))">Next</a>
                  </li>
                  <li class="page-item">
                    <a class="page-link" href="#" @click="setPage(totalPages)">last</a>
                  </li>
                </ul>
              </nav>
          </div>
      </div>
      <div class="col">
        <label for="seacrhInputPlace"> Total Item per page</label>
          <select v-model="itemperpage">
            <option disabled value="">Please select one</option>
            <option>10</option>
            <option>15</option>
            <option>20</option>
        </select>
      </div>
      <div class="col">
        <div  class="tdesign">
          <table class="table">
              <thead class="thead-light">
                <th scope="col">ObjectID</th>
                <th scope="col">Image</th>
                <th scope="col">Place name</th>
                <th scope="col">Summary</th>
                <th scope="col">Street</th>
                <th scope="col">City</th>
                <th scope="col">State</th>
                <th scope="col">Country</th>
              </thead>
              <tr v-for="items in pageplacelist" v-bind:key="items._id">
                <td>{{items._id}}</td>
                <td width="30%"><img v-bind:src="items.place_thumbnail_url"/></td>
                <td>{{items.place_name}}</td>
                <td>{{items.place_summary}}</td>
                <td>{{items.place_street}}</td>
                <td>{{items.place_city}}</td>
                <td>{{items.place_state}}</td>
                <td>{{items.place_country}}</td>

              </tr>
            </table>
        </div>
      </div>
    </div>
  </div>
  

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
        placename:'',
        placeslist: [ ],
        itemperpage:10,
        currentPage:1
      }
  },
  watch:{
      'placename': function(val)
      {
        if(val!='')
        {
          axios("http://localhost:9000/places/"+val)
          //.then(response => (this.placeslist=response.data))
            .then((response)=>
            {
              console.log(response.data);
              this.placeslist=response.data
            });
        }
        else
        {
          axios("http://localhost:9000/places")
          //.then(response => (this.placeslist=response.data))
            .then((response)=>
            {
              console.log(response.data);
              this.placeslist=response.data
            });
        }
      }
  },
  computed : {
     totalitems: function () {
        return this.placeslist.length;
      },
      totalPages:function(){
        return Math.round(this.totalitems/ this.itemperpage)
        
      },
      pageplacelist: function () {
            return this.placeslist.slice(((this.currentPage-1)*this.itemperpage),(this.currentPage*this.itemperpage))

      },
      pagechunk:function () {
            var item=[];
            if((this.currentPage+10)<this.totalPages)
            {
              for(let i=this.currentPage;i<=this.currentPage+10;i++)
              {
                 item.push(i);
              }  
            }
            else
            {
              for(let i=(this.totalPages-10);i<=this.totalPages;i++)
              {
                 item.push(i);
              }  
            }

            return item;
            
      } 
  },
  mounted() {
    axios("http://localhost:9000/places")
      .then(response => (this.placeslist=response.data))
      
  },
  methods: {
    setPage: function(pageNumber) {
      this.currentPage = pageNumber;
      this.pageplacelist=this.placeslist.slice(((this.currentPage-1)*this.itemperpage),(this.currentPage*this.itemperpage))

    }

  }

}


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.tdesign {
  /*padding-left:10%;
  padding-right:10%;*/
}
</style>
