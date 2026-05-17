import {defineStore} from 'pinia'
import { ref } from 'vue'
export default defineStore('classStore',()=>{
	let classList = ref([])
	function storeClass(list){
		classList.value= list
	}
	function removeStore(){
		classList.value=[]
	}
	return {
		classList,
		storeClass,
		removeStore
	}
})