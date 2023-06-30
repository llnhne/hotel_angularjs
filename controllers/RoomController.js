window.RoomController = function ($scope, $routeParams, $http) {
    $scope.kiemtradulieu = {
        ten: false,
        cmnd: false,
        sdt: false,
        email: false,
        ngayden: false,
        ngaytra: false
    }
    let apiUrl = "http://localhost:3000/info"
    $scope.getData = function () {
        $http.get(apiUrl).then(
            function (reponse) {
                if (reponse.status == 200) {
                    console.log(reponse)
                    $scope.info = reponse.data;
                }
            }
        )
    }
    $scope.getData();
    $scope.onClose = function () {
        $scope.inputValue = {
            ten: "",
            cmnd: "",
            sdt: "",
            email: "",
            ngayden: "",
            ngaytra: "",
            thanhtoan: ""
        }
        $scope.editId = 0;
    }
    $scope.onSubmitForm = function () {
        let flag = false;
        if (!$scope.inputValue || !$scope.inputValue.ten || $scope.inputValue.ten == " ") {
            $scope.kiemtradulieu.ten = true;
            flag = true;
        } else {
            $scope.kiemtradulieu.ten = false;
        }
        if (!$scope.inputValue || !$scope.inputValue.cmnd) {
            $scope.kiemtradulieu.cmnd = true;
            flag = true;
        } else {
            $scope.kiemtradulieu.cmnd = false;
        }
        if (!$scope.inputValue || !$scope.inputValue.sdt) {
            $scope.kiemtradulieu.sdt = true;
            flag = true;
        } else {
            $scope.kiemtradulieu.sdt = false;
        }
        if (!$scope.inputValue || !$scope.inputValue.email) {
            $scope.kiemtradulieu.email = true;
            flag = true;
        } else {
            $scope.kiemtradulieu.email = false;
        }
        if (!$scope.inputValue || !$scope.inputValue.ngayden) {
            $scope.kiemtradulieu.ngayden = true;
            flag = true;
        } else {
            $scope.kiemtradulieu.ngayden = false;
        }
        if (!$scope.inputValue || !$scope.inputValue.ngaytra) {
            $scope.kiemtradulieu.ngaytra = true;
            flag = true;
        } else {
            $scope.kiemtradulieu.ngaytra = false;
        }
        if (!flag) {
            let editId = $scope.editId;
            if (editId) {
                let updateItem = {
                    ten: $scope.inputValue.ten,
                    cmnd: $scope.inputValue.cmnd,
                    sdt: $scope.inputValue.sdt,
                    email: $scope.inputValue.email,
                    ngayden: $scope.inputValue.ngayden,
                    ngaytra: $scope.inputValue.ngaytra,
                    thanhtoan: $scope.inputValue.thanhtoan
                }
                $http.put(
                    `${apiUrl}/${editId}`,
                    updateItem
                ).then(function (reponse) {
                    if (reponse.status == 200) {
                        $scope.getData();
                    }
                })
                $scope.onClose();
                return;
            }
            let newItem = {
                ten: $scope.inputValue.ten,
                cmnd: $scope.inputValue.cmnd,
                sdt: $scope.inputValue.sdt,
                email: $scope.inputValue.email,
                ngayden: $scope.inputValue.ngayden,
                ngaytra: $scope.inputValue.ngaytra,
                thanhtoan: $scope.inputValue.thanhtoan
            }
            $http.post(
                apiUrl,
                newItem
            ).then(
                function (reponse) {
                    console.log(reponse);
                    if (reponse.status == 201) {
                        $scope.getData();
                    }
                }
            )
            $scope.onClose();
        }
    }
    $scope.onEdit = function (editId) {
        $scope.editId = editId;
        $http.get(
            `${apiUrl}/${editId}`
        ).then(
            function (reponse) {
                if (reponse.status == 200) {
                    $scope.inputValue = {
                        ten: reponse.data.ten,
                        cmnd: reponse.data.cmnd,
                        sdt: reponse.data.sdt,
                        email: reponse.data.email,
                        ngayden: reponse.data.ngayden,
                        ngaytra: reponse.data.ngaytra,
                        thanhtoan: reponse.data.thanhtoan
                    }
                }
            }
        )
    }
    $scope.onDelete = function (deleteId) {
        var result = window.confirm('Bạn có muốn xóa không ?')
        if (result == true) {
            $scope.deleteId = deleteId;
            $http.delete(`${apiUrl}/${deleteId}`).then(
                function (reponse) {
                    if (reponse.status == 200) {
                        $scope.getData();
                    }
                }
            )
            alert('Xóa thành công !')
        } else {
            alert('Xóa thất bại !')
        }
    }
}