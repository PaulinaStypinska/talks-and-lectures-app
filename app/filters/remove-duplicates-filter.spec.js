
describe("Filter: remove-duplicates-filter", function () {
  var $filter;

  beforeEach(function () {
    module("myApp.filters.remove-duplicates-filter");
  })

  beforeEach(inject(function (_$filter_) {
    $filter = _$filter_;
  }));

  it("should do nothing for data that's not an array", function () {
    var data = "foo";
    expect($filter("removeDups")(data)).toBe(data);
  });

  it("should return a filtered array when evaluating an array with duplicates", function () {
    var data = [1, 1, 2, 3];
    expect($filter("removeDups")(data)).toEqual([1,2,3]);
  });

  it("should return the same array when evaluating an array with duplicates", function () {
    var data = [1, 2, 3];
    expect($filter("removeDups")(data)).toEqual(data);
  });

});