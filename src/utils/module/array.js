const insertItem = (arr, data) => {
    arr.push(data); // 向数组中插入新元素
}

const deleteItem = (arr, data) => {
    const index = arr.findIndex(item => item === data);
    if (index !== -1) {
        arr.splice(index, 1); // 删除指定 ID 的元素
    }
}

const checkIdExists = (arr, data) => {
    return arr.some(item => item === data);
}

export default {
    insertItem,
    deleteItem,
    checkIdExists
}