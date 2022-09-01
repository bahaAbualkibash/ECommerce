namespace ECommerce.Specifications
{
    public class OrderSpecParams
    {
        private const int MaxPageSize = 50;

        public int PageIndex { get; set; } = 1;

        private int _PageSize = 30;

        public int PageSize
        {
            get => _PageSize;
            set => _PageSize = value > MaxPageSize ? MaxPageSize : value;
        }

        //TODO: filter by attribute inside the orders if needed
        public bool IsDeliveredIncluded { get; set; }
        public int? Sort { get; set; }

        // add search functionlality if needed
        //private string? _search;
        //public string? Search
        //{
        //    get => _search;
        //    set => _search = value?.ToLower();
        //}
    }
}
