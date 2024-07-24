using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NhaXeNoiBai.Model.Enums
{

    public enum OrderType
    {
        Ascending = 0,
        Descending = 1,
    }

    public enum FilterConditionOperator
    {
        Equal,
        NotEqual,
        GreaterThan,
        LessThan,
        GreaterEqual,
        LessEqual,
        In,
        NotIn,
        Contains,
        DoesNotContain,
        BeginsWith,
        DoesNotBeginWith,
        EndsWith,
        DoesNotEndWith,
        OnXYear,
    }

    public enum FilterLogicalOperator
    {
        And,
        Or,
    }

}
