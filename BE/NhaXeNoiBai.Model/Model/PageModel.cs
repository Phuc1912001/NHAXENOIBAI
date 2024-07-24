using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NhaXeNoiBai.Model.Model
{
    public class PageModel
    {
        public PageModel()
        {
            PageSize = 10;
            PageNo = 1;
        }

        public int PageSize
        {
            get
            {
                if (_pageSize <= 0)
                {
                    _pageSize = 10;
                }
                return _pageSize;
            }
            set
            {
                _pageSize = value;
            }
        }


        public int PageNo
        {
            get
            {
                if (_pageNo <= 0)
                {
                    _pageNo = 1;
                }
                return _pageNo;
            }
            set
            {
                _pageNo = value;
            }
        }

        public long Total
        {
            get
            {
                return _total;
            }
            set
            {
                _total = value;
            }
        }

        public int Start
        {
            get
            {
              
                return getStartIndex();
            }
            set
            {
                _start = value;
            }
        }
        public int getStartIndex()
        {
            int startIndex = 0;
            if (this.PageSize * this.PageNo > this.Total)
            {
                this.PageNo = (int)Math.Ceiling(Convert.ToDecimal(this.Total) / Convert.ToDecimal(this.PageSize));
            }
            startIndex = this.PageSize * (this.PageNo - 1);
            return startIndex;
        }

        private int _pageSize { set; get; }
        private int _pageNo { set; get; }
        private long _total { set; get; }
        private int _start { set; get; }


    }
}
