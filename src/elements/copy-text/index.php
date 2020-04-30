<div class="box">
    <div class="box-header">Where can be used</div>
    <div class="box-body">
        <ul>
            <li>implement on Text input</li>
            <li>implement on any element which have text</li>
        </ul>
    </div>
</div>

<div class="box">
    <div class="box-header">Html</div>
    <div class="box-body">
        <pre>
<code data-language="html">
<?= htmlspecialchars(file_get_contents(__DIR__ . '/html.php')); ?>  
</code>
        </pre>
    </div>
</div>

<div class="box">
    <div class="box-header">Javascript</div>
    <div class="box-body">
        <pre>
<code data-language="javascript">
<?php include __DIR__ . './js.php'; ?>  
</code>
        </pre>
    </div>
</div>

<div class="box">
    <div class="box-header">Demo</div>
    <div class="box-body">
        <div class="code-block">
            <?php include __DIR__ . './html.php'; ?>  
        </div>
    </div>
</div>

<script type="text/javascript">
    $(document).ready(function ()
    {
        <?php include __DIR__ . './js.php'; ?>
    });
</script>