import { ServerIcon } from '@heroicons/react/outline';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNode, viewDetailUnderlay } from '../../store/actions/fabric';
import Content from '../includes/Content';
import Layout from '../includes/Layout';

export default function Home() {
  const USER = useSelector((state) => state.user);
  const FABRIC = useSelector((state) => state.fabric);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchNode());
    dispatch(viewDetailUnderlay());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, USER]);

  return (
    <Layout>
      <Content title="Dashboard">
        <div className="relative mt-8 ">
          <div className="flex flex-col gap-1">
            <div className="inline-flex gap-2">
              <span className="text-xl font-light text-warmGray-600">
                IP Tunnel :{' '}
              </span>
              <h1 className="text-xl font-bold text-warmGray-800 ">
                {FABRIC?.detailTunnel?.ip_tunnel_block ?? ''}
              </h1>
            </div>
            <div className="inline-flex gap-2">
              <span className="text-xl font-light text-warmGray-600">
                Underlay Digunakan :{' '}
              </span>
              <h1 className="text-xl font-bold text-warmGray-800 ">
                {FABRIC?.detailTunnel?.underlay_used ?? ''}
              </h1>
            </div>
            <div className="inline-flex gap-2">
              <span className="text-xl font-light text-warmGray-600">
                Underlay Tersedia :{' '}
              </span>
              <h1 className="text-xl font-bold text-warmGray-800 ">
                {FABRIC?.detailTunnel?.underlay_available ?? ''}
              </h1>
            </div>
          </div>
        </div>
        <div className="mt-8 relative">
          <h1 className="text-lg font-semibold text-warmGray-800">
            List Nodes
          </h1>
          <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 lg:gap-x-8 lg:gap-y-16">
            {FABRIC.dataNodes.length > 0 ? (
              FABRIC.dataNodes.map((item) => (
                <motion.div
                  whileTap={{ scale: 0.75 }}
                  key={item._id}
                  className="bg-white shadow-md rounded-lg p-4 group hover:shadow-lg transition-all duration-300 ease-in-out cursor-pointer">
                  <div className="flex flex-row-reverse justify-between px-2">
                    <span className="flex items-center justify-center h-12 w-12 rounded-md bg-warmGray-300 bg-opacity-10">
                      <ServerIcon
                        className="h-7 w-7 text-warmGray-800"
                        aria-hidden="true"
                      />
                    </span>
                    <div className="">
                      <h3 className="text-lg font-bold text-warmGray-700">
                        {item.routerName}
                      </h3>
                      <p className="mt-2 text-base font-light text-warmGray-500">
                        {item.management}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 mt-6 px-2">
                    <div className="flex flex-col gap-1">
                      <span className="text-sm font-medium text-warmGray-500">
                        VXLAN
                      </span>
                      <span className="font-semibold text-lg text-warmGray-800">
                        {item.interfaceList.length}
                      </span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-sm font-medium text-warmGray-500">
                        OSPF
                      </span>
                      <span className="font-semibold text-lg text-warmGray-800">
                        {item.interfaceList.length}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <p>Data Kosong</p>
            )}
          </div>
        </div>
      </Content>
    </Layout>
  );
}
