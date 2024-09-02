import React from "react";
import styles from "./policy.module.scss";

const Page = () => {
  return (
    <div className={styles.wrapperPolicy}>
      <div className={styles.titlePolicy}>CHÍNH SÁCH</div>
      <div className={styles.secondTitle}>Vận chuyển hành khách</div>
      <div className={styles.titleItem}>I. Quy định về xác nhận lịch trình</div>
      <div>
        Ngày sau khi đặt xe, chúng tôi sẽ gửi tin nhắn SMS vào số điện thoại đặt
        xe hoặc email của quý khách để xác nhận lịch trình. Quý khách có trách
        nhiệm kiểm tra và thông báo lại cho chúng tôi nếu có sai sót. Chúng tôi
        có quyền cung cấp Tên, Địa chỉ, Mã chuyến bay và Số điện thoại của quý
        khách cho lái xe để việc đón tiễn được thuận tiện.
      </div>
      <div className={styles.titleItem}>
        II. Quy định về thời gian lái xe chờ với từng dịch vụ.
      </div>
      <div>
        Trong trường hợp Quý khách đi xe thông thường, lái xe sẽ chờ Quý khách
        tối đa 15 phút tại điểm đón yêu cầu. Ngoài thời gian này, chúng tôi có
        quyền hủy chuyến mà không phải bồi thường hoặc chúng tôi có quyền tính
        thêm tiền cước chờ khách. Trong trường hợp Quý khách chọn dịch vụ đi
        ghép với hành khách khác. Quý khách phải có mặt đúng giờ đã thống nhất
        với tài xế tại điểm đón Quý khách yêu cầu. Thời gian chờ tối đa là 15
        phút trong trường hợp Hành khách đi chung đồng ý đợi. Khi Quý khách cung
        cấp đầy đủ thông tin như: Mã hiệu chuyến bay, thời gian hạ cánh, cất
        cánh, sảnh ra. Lái xe sẽ chờ hoặc chúng tôi sẽ xắp sếp sẵn xe đón Quý
        khách ngay cả khi Quý khách bị chậm chuyến bay.
      </div>
      <div className={styles.titleItem}>
        III. Quy định về thời gian Quý khách chờ với từng dịch vụ
      </div>
      <div>
        Trong trường hợp Quý khách đặt dịch vụ xe thông thường, lái xe sẽ đến
        đón đúng giờ và đúng địa điểm Quý khách yêu cầu. Sau 15 phút (nếu đi Nội
        Bài) hoặc 30 phút (nếu đi đường dài) so với giờ hẹn, nếu lái xe vẫn chưa
        đến, Quý khách có quyền di chuyển bằng taxi và chúng tôi sẽ bù chênh
        lệch cước phí tương ứng. Trong trường hợp Quý khách chọn dịch vụ đi ghép
        xe, lái xe sẽ đến đón tại địa điểm Quý khách yêu cầu trong khoảng +/-15
        phút so với giờ yêu cầu đón. Chúng tôi sẽ thông báo chính xác thời gian
        đón trước 30 phút so với giờ khởi hành.
      </div>
      <div className={styles.titleItem}>
        IV. Quy định về hủy đặt xe/Thay đổi lịch trình:
      </div>
      <div>
        Quý khách có quyền hủy đặt xe hoặc thay đổi giờ đi mà không mất thêm chi
        phí bằng cách gọi điện tới Tổng đài 0329609726 để thông báo thay đổi
        hoặc hủy chuyến nếu cần và chúng tôi mong muốn Quý khách sẽ thông báo về
        việc này càng sớm càng tốt để chúng tôi thay đổi việc điều xe kịp thời.
      </div>
      <div className={styles.titleItem}>V. Quy định khác</div>
      <div>
        Quý khách không mang theo những hàng hóa cấm quy định pháp luật hiện
        hành. Quý khách không được hút thuốc và ăn uống gây mất vệ sinh ở trên
        xe. Trong điều kiện bất khả kháng (động đất, bão lũ, đường ngập…), chúng
        tôi được quyền hủy hoặc đến muộn hơn dự kiến hoặc yêu cầu quý khách di
        chuyển để xe chúng tôi đón được (đường ô tô bị cấm).
      </div>
    </div>
  );
};

export default Page;
