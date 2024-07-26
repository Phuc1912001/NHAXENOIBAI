// import React from "react";
// import styles from "./CreateDiscountPanel.module.scss";
// import { Drawer } from "antd";

// interface ICreateDiscountPanel {
//   getListDiscount: () => void;
// }

// const CreateDiscountPanel = (props: ICreateDiscountPanel , ref:React.Ref<Pan>  ) => {
//   return (
//     <div>
//       <Drawer
//         title={
//           <span style={{ color: "#12161B" }}>{`${
//             type === "View"
//               ? "Xem Giá Xe"
//               : type === "Create"
//               ? "Tạo Giá Xe"
//               : "Sửa Giá Xe"
//           }`}</span>
//         }
//         destroyOnClose
//         open={isOpen}
//         placement="right"
//         maskClosable={false}
//         closable={false}
//         extra={<CloseOutlined onClick={handleClose} />}
//         footer={
//           <div>
//             <Button style={{ marginRight: "8px" }} onClick={handleClose}>
//               Đóng
//             </Button>
//             {type === "Create" ? (
//               <Button type="primary" onClick={handleSubmit}>
//                 Tạo Giá Xe
//               </Button>
//             ) : (
//               type === "Edit" && (
//                 <Button type="primary" onClick={handleSubmit}>
//                   Sửa Giá Xe
//                 </Button>
//               )
//             )}
//           </div>
//         }
//         width={520}
//       >
//         {type === "Create" || type === "Edit" ? (
//           <Form layout="vertical" form={form} onValuesChange={handleFormChange}>
//             <Form.Item
//               rules={[{ required: true, message: "Vui lòng điền loại xe." }]}
//               name="carType"
//               label="Loại Xe :"
//             >
//               <Input maxLength={200} />
//             </Form.Item>

//             <Form.Item
//               rules={[
//                 {
//                   required: true,
//                   message: "Vui lòng điền giá Hà Nội -> Nội Bài.",
//                 },
//               ]}
//               name="fromHanoiToNoiBai"
//               label="Hà Nội -> Nội Bài:"
//             >
//               <Input maxLength={200} />
//             </Form.Item>

//             <Form.Item
//               rules={[
//                 {
//                   required: true,
//                   message: "Vui lòng điền giá Nội Bài -> Hà Nội.",
//                 },
//               ]}
//               name="fromNoiBaiToHanoi"
//               label="Nội Bài -> Hà Nội :"
//             >
//               <Input maxLength={200} />
//             </Form.Item>

//             <Form.Item
//               rules={[
//                 {
//                   required: true,
//                   message: "Vui lòng điền giá hai chiều.",
//                 },
//               ]}
//               name="toWay"
//               label="Hai Chiều :"
//             >
//               <Input maxLength={200} />
//             </Form.Item>
//           </Form>
//         ) : (
//           <div>view</div>
//         )}
//       </Drawer>
//       <ModalDiscard
//         openModal={isModalVisible}
//         handleDiscard={handleDiscard}
//         handleStay={handleStay}
//       />
//     </div>
//   );
// };

// export default CreateDiscountPanel;
