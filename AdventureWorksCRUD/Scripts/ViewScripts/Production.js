//Culture Form Model
function CultureModel() {
    let CultureID = "", Name = "", OperationType = "";
}

//Culture GET
$(document).ready(function () {
    $("#cultureTable").DataTable({
        "info": false,
        "lengthChange": false,
        "drawCallback": function () {
            cultureReset();
        },
        "ajax": {
            "url": "/Production/GetCulture",
            "type": "GET",
            "datatype": "json"
        },
        "columns": [
            { "data": "CultureID" },
            { "data": "Name" },
            {
                "data": "ModifiedDate",
                "render": function (data) {
                    if (data === null) return "";
                    return moment(data).format('DD/MM/YYYY');
                }
            },
            {
                "data": "CultureID", "render": function (data) {
                    return "<button type='button' class='btn btn-success btn-sm' onclick=editRowCulture("+data+"><i class='fas fa-edit'></i></button>&nbsp;<div class='btn btn-danger btn-sm' style='cursor:pointer;' onclick=cultureConfirm(" + data + ")><i class='fas fa-trash-alt'></i></div>";
                 },
                "orderable": false,
                "searchable": false,
                "className": 'text-center'
            }
        ]
    });
});

//Culture Edit Button
function editRowCulture(data) {
    debugger;
    $('#cultureSave').text('Update');

    $('#cultureTable tbody').on('click', 'tr', function () {
        $('tr').removeClass('text-primary');
        $(this).addClass('text-primary');
        $('#cultureName').removeClass('border border-danger');
    });

    $('#cultureTable tbody').on('click', 'button', function () {
        let table = $('#cultureTable').DataTable();
        let row = table.row($(this).parents('tr')).data();

        $('#cultureName').val(row.Name);
        $('#cultureID').text('');
    });
}

//Culture Validate
function validateCulture() {
    let val = true;

    if ($("#cultureName").val() == "") {
        $("#cultureName").addClass('border border-danger');
        val = false;
    }

    if (val == false) {
        $("#cultureAlert").show('fade');
        setTimeout(function () { $("#cultureAlert").hide('fade'); }, 7000);
    }

    return val;
}

//Culture Save
$('#cultureSave').click(function () {
    if (validateCulture()) {
        culturePOST();
    }
});

//Culture POST
function culturePOST() {

    let viewModel = new CultureModel();
    viewModel.CultureID = $('#cultureID').val();
    viewModel.Name = $('#cultureName').val();
    viewModel.OperationType = $('#cultureSave').text();

    let ljson = JSON.stringify({ CL: viewModel });

    $.ajax({
        url: '/Person/PostCulture',
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
                cultureReset();
            }
        },
        success: function () {
            $.unblockUI();
            culturePostSuccess();
            $('#cultureTable').DataTable().ajax.reload();
            cultureReset();
        }
    });
}

//Culture POST - Success
function culturePostSuccess() {
    $('#cultureSuccess').show('fade');
    setTimeout(function () { $('#cultureSuccess').hide('fade'); }, 6000);
}

//Culture DELETE
function cultureConfirm(data) {
    $('#cultureModal').modal('show');
    $('#cultureDeleteID').val(data);
}
function cultureDelete() {
    let id = $('#cultureDeleteID').val();
    $('#cultureID').val(id)
    $('#cultureSave').text('Delete');
    culturePOST();
}

//Culture Form - Remove red border as user type
$("#cultureName").on('keyup', function (e) {
    if ($(this).val().length > 0) {
        $(this).removeClass("border border-danger");
    }
});

//Culture Reset
$("#cultureReset").click(function () {
    cultureReset();
});
function cultureReset() {
    $('#cultureName').val('');
    $('#cultureName').removeClass('border border-danger');

    $('#cultureTable tr').removeClass('text-primary');

    $('#cultureID').val('');
    $('#cultureDeleteID').val('');
    $('#cultureSave').text('Save');
};

//--------------------------------------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------------------------------------
