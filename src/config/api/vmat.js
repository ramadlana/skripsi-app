import axios from '../axios';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  // auth end point
  login: (credentials) => axios.post('auth/login', credentials),

  // fabric end point
  setUnderlay: (data) => axios.post('inventory/setupunderlay', data),

  // vxlan end point
  addBridgeVxlan: (data) =>
    axios.post('configure/create-new-bridge-domain', data),
  listBridgeVxlan: () => axios.get('configure/bridgedomain'),
  addDomainBridgeVxlan: (data) =>
    axios.post('configure/add-bridge-domain-member', data),
  listDomainBridge: (idBridge) =>
    axios.get(`configure/member-of-bd/${idBridge}`),

  //   ospf end point
};
