using Microsoft.AspNetCore.Mvc.ModelBinding;
using NhaXeNoiBai.Model.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NhaXeNoiBai.Model.Model
{
    [BindRequired]
    public class DataGridModel
    {
        public DataGridModel()
        {

            PageInfo = new PageModel();
            OrderInfo = new OrderModel();
            SearchInfo = new SearchModel();
            FilterInfo = new FilterModel();
        }

        public PageModel PageInfo { get; set; }

        public OrderModel OrderInfo { get; set; }

        public SearchModel SearchInfo { get; set; }

        public FilterModel FilterInfo { get; set; }

    }
    [BindRequired]
    public class OrderModel
    {
        public string? ColumnName { get; set; }

        public OrderType OrderType { get; set; }
    }
    [BindRequired]
    public class FilterModel
    {
        public FilterModel()
        {
            FilterOperator = FilterLogicalOperator.And;
            FilterCondition = new List<FilterConditionModel>();
        }
        public FilterLogicalOperator FilterOperator { get; set; }

        public List<FilterConditionModel> FilterCondition { get; set; }
    }
    [BindRequired]
    public class FilterConditionModel
    {
        public string? ColumnName { get; set; }

        public FilterConditionOperator Operator { get; set; }

        public List<object>? Values { get; set; }

        public DateTimeOffset? FilterStartTime { get; set; }
        public DateTimeOffset? FilterEndTime { get; set; }

        public DateTimeOffset? StartDateTimeFrom { get; set; }
        public DateTimeOffset? StartDateTimeTo { get; set; }
        public DateTimeOffset? EndDateTimeFrom { get; set; }
        public DateTimeOffset? EndDateTimeTo { get; set; }

    }
    [BindRequired]
    public class SearchModel
    {
        public SearchModel()
        {
            SearchOperator = FilterLogicalOperator.And;
            SearchRule = new List<SearchRule>();
        }

        public FilterLogicalOperator SearchOperator { get; set; }

        public List<SearchRule> SearchRule { get; set; }
    }
    [BindRequired]
    public class SearchRule
    {
        public string? KeyWord { get; set; }
        public List<string>? SearchColumns { get; set; }

    }
}
