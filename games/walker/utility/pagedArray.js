UTILITY.PagedArray = {};
UTILITY.PagedArray.new = function(array, pageSize){
    let pa = {
        array: array,
        pageSize: pageSize,
        currentPage: 0
    };
    pa.totalPages = function(){
        let length = pa.array.length;
        if(length == 0){
            return 0;
        }
        return length / pa.pageSize;
    };
    pa.nextPage = function(){
        if(pa.currentPage + 1 < pa.totalPages()){
            pa.currentPage++;
        }
    };
    pa.previousPage = function(){
        if(pa.currentPage > 0){
            pa.currentPage--;
        }
    };
    pa.getPageElements = function(){
        let elements = [];
        let pageStart = pa.currentPage * pa.pageSize;
        let pageEnd = pageStart + pa.pageSize;
        for(let i = pageStart; i < pageEnd; i++){
            if(i < pa.array.length){
                elements.push(pa.array[i]);
            }
        }
        return elements;
    };
    return pa;
};