<html>
    <head>
        <title>TODO supply a title</title>
        <meta charset="UTF-8">
        
        <link href="node_modules/jquery-toast-plugin/dist/jquery.toast.min.css" rel="stylesheet" type="text/css">
        <link href="src/rainbow-master/themes/css/rainbow.css" rel="stylesheet" type="text/css">
        <link href="dist/sr-basic-feature.css" rel="stylesheet" type="text/css">
        
        <script src="node_modules/jquery/dist/jquery.min.js" type="text/javascript"></script>
        <script src="node_modules/jquery-toast-plugin/dist/jquery.toast.min.js" type="text/javascript"></script>
        
        <script src="dist/sr-basic-feature.js" type="text/javascript"></script>
        
        <style>
            table
            {
                width : 100%;
                border-collapse: collapse;
                font-family: sans-serif;
            }

            table th
            {
                text-align: left;
            }

            table th,table td
            {
                border : 1px solid #CCC;
                padding : 5px 10px;
            }

            .code-block
            {
                padding: 10px;                
                background-color: #ffcccc;
            }

            .box
            {
                border : 1px solid #6666ff;
            }

            .box .box-header
            {
                background-color: #6666cc;
                color : #FFF;
                padding: 5px 10px;
            }

            .box .box-body
            {
                padding: 5px;
            }
        </style>
        
        
    </head>
    <body>
        <table>
            <thead>
                <tr>
                    <th style="width : 5%">#</th>
                    <th style="width : 30%">Functionality</th>
                    <th style="width : 60%">Usage</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>1</td>
                    <td>Children checkbox checked on parent checkbox check </td>
                    <td>
                        <?php include_once './src/elements/chk-select-all/index.php'; ?>
                    </td>
                </tr>
                
                <tr>
                    <td>2</td>
                    <td>toggle class on click, change </td>
                    <td>
                        <?php include_once './src/elements/css-class-toggle/index.php'; ?>
                    </td>
                </tr>
                
                <tr>
                    <td>3</td>
                    <td>Copy Text </td>
                    <td>
                        <?php include_once './src/elements/copy-text/index.php'; ?>
                    </td>
                </tr>
                
                <tr>
                    <td>4</td>
                    <td>SR Paragraph </td>
                    <td>
                        <?php include_once './src/elements/sr-paragraph/index.php'; ?>
                    </td>
                </tr>
                
                <tr>
                    <td>4</td>
                    <td>SR Textarea </td>
                    <td>
                        <?php include_once './src/elements/sr-textarea/index.php'; ?>
                    </td>
                </tr>
            </tbody>
        </table>
    </body>

    <script src="src/rainbow-master/dist/rainbow.min.js"></script>
</html>
