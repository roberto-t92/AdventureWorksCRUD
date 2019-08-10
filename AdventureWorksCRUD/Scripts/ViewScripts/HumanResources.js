//Department Form Model
function DepartmentModel() {
    let DepartmentID = "", Name = "", GroupName = "", OperationType = "";
}

// Department GET
$(document).ready(function () {
    $("#departmentTable").DataTable({
        "info": false,
        "lengthChange": false,
        "drawCallback": function () {
            departmentReset();
        },
        "ajax": {
            "url": "/HumanResources/GetDepartment",
            "type": "GET",
            "datatype": "json"
        },
        "columns": [
            { "data": "DepartmentID" },
            { "data": "Name" },
            { "data": "GroupName" },
            {
                "data": "ModifiedDate",
                "render": function (data) {
                    if (data === null) return "";
                    return moment(data).format('DD/MM/YYYY');
                }
            },
            {
                "data" : "DepartmentID", "render": function (data) {
                    return "<button type='button' class='btn btn-success btn-sm' onclick=editRowDepartment(" + data + ")><i class='fas fa-edit'></i></button>"
                },
                "orderable": false,
                "searchable": false,
                "className": 'text-center'
            }
        ]
    });
});

//Department Edit button
function editRowDepartment(data) {
    $('#departmentSave').text('Update');

    $('#departmentTable tbody').on('click', 'tr', function () {
        $('tr').removeClass('text-danger');
        $(this).addClass('text-danger');
    });

    $('#departmentTable tbody').on('click', 'button', function () {
        let table = $('#departmentTable').DataTable();
        let row = table.row($(this).parents('tr')).data();

        $('#departmentName').val(row.Name);
        $('#departmentGroupName').val(row.GroupName);
        $('#departmentID').val(data);
    });
}

//Department Validate
function validateDepartment() {
    let val = true;

    if ($("#departmentName").val() == "" || $("#departmentGroupName").val() == "") {
        $("#departmentAlert").show('fade');
        setTimeout(function () { $("#departmentAlert").hide('fade'); }, 7000);
        val = false;
    }
    if ($("#departmentGroupName").val() == "") {
        $("#departmentGroupName").addClass('border border-danger');
        val = false;
    }
    if ($('#departmentName').val() == "") {
        $("#departmentName").addClass('border border-danger');
        val = false;
    }
    return val;
}

//Department Submit
//$("#departmentSave").click(function () {    

//    if (validateDepartment()) {

//        if ($('#departmentSave').text() == 'Save') {
//            departmentPOST();
//        }

//        if ($('#departmentSave').text() == 'Update') {
//            departmentPUT();
//        }

//        if ($('#departmentSave').text() == 'Delete') {

//        }
//    }
//});

$('#departmentSave').click(function () {
    if (validateDepartment()) {
        departmentPOST();
    }
});

//Department POST
function departmentPOST() {

    let LDepartmentModel = new DepartmentModel();
    LDepartmentModel.Name = $('#departmentName').val();
    LDepartmentModel.GroupName = $('#departmentGroupName').val();
    LDepartmentModel.DepartmentID = $('#departmentID').val();
    LDepartmentModel.OperationType = $('#departmentSave').text();

    let ljson = JSON.stringify({ DM: LDepartmentModel });

    $.ajax({
        url: '/HumanResources/PostDepartment',
        type: 'POST',
        async: 'true',
        cache: 'false',
        data: ljson,
        contentType: 'application/json',
        beforeSend: function () {
            $(document).ready(function () {
                $.blockUI({
                    message: '<div class="circle"></div><div class="circle1"></div>',
                    css: {
                        border: 'none',
                        padding: '15px',
                        backgroundColor: '#000',
                        '-webkit-border-radius': '10px',
                        '-moz-border-radius': '10px',
                        opacity: .5,
                        color: '#fff'
                    }
                });
            });
        },
        complete: function () {
            $.unblockUI();
        },
        error: function (xhr, httpStatusMessage, customMessage) {
            if (xhr.status === 500) {
                $.unblockUI();
                $('#errorModalMsg').text(customMessage);
                $('#errorModal').modal('show');
            }
        },
        success: function () {
            $.unblockUI();
            departmentPostSuccess();
            $('#departmentTable').DataTable().ajax.reload();
        }
    });
}

//Department PUT
function departmentPUT() {
    
    let LDepartmentModel = new DepartmentModel();
    LDepartmentModel.Name = $('#departmentName').val();
    LDepartmentModel.GroupName = $('#departmentGroupName').val();
    LDepartmentModel.DepartmentID = $('#departmentID').val();

    let ljson = JSON.stringify({ DM: LDepartmentModel });

    $.ajax({
        url: '/HumanResources/PutDepartment',
        type: 'POST',
        async: 'true',
        cache: 'false',
        headers: { "X-HTTP-Method-Override": "PUT" },
        data: ljson,
        contentType: 'application/json',
        beforeSend: function () {
            $(document).ready(function () {
                $.blockUI({
                    message: '<div class="circle"></div><div class="circle1"></div>',
                    css: {
                        border: 'none',
                        padding: '15px',
                        backgroundColor: '#000',
                        '-webkit-border-radius': '10px',
                        '-moz-border-radius': '10px',
                        opacity: .5,
                        color: '#fff'
                    }
                });
            });
        },
        complete: function () {
            $.unblockUI();
        },
        error: function (xhr, httpStatusMessage, customMessage) {
            if (xhr.status === 500) {
                $.unblockUI();
                $('#errorModalMsg').text(customMessage);
                $('#errorModal').modal('show');
            }
        },
        success: function () {
            $.unblockUI();
            departmentPostSuccess();
            $('#departmentTable').DataTable().ajax.reload();
        }
    });
}

//Department POST - Error
function departmentPostError() {
    $('#departmentPostError').show('fade');
    setTimeout(function () { $('#departmentPostError').hide('fade'); }, 6000);
}
//Department POST - Success
function departmentPostSuccess() {
    $('#departmentPostSuccess').show('fade');
    setTimeout(function () { $('#departmentPostSuccess').hide('fade'); }, 6000);
}
//Department Form - Remove red border as user type
$("#departmentGroupName").on('keyup', function (e) {
    if ($(this).val().length > 0) {
        $(this).removeClass("border border-danger");
    }
});
$("#departmentName").on('keyup', function (e) {
    if ($(this).val().length > 0) {
        $(this).removeClass("border border-danger");
    }
});

//Department Reset
$("#departmentReset").click(function () {
    departmentReset();
});

function departmentReset() {
    $('#departmentName').val('');
    $('#departmentGroupName').val('');
    $('#departmentTable tr').removeClass('text-danger');
    $('#departmentSave').text('Save');
};
