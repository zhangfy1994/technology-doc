##### path 的几个常用的 API 比较简单，整理如下：

<div class="bi-table">
  <table>
    <colgroup>
      <col width="192px" />
      <col width="178px" />
      <col width="459px" />
    </colgroup>
    <tbody>
      <tr height="34px">
        <td rowspan="1" colSpan="1">
          <div data-type="p">方法</div>
        </td>
        <td rowspan="1" colSpan="1">
          <div data-type="p">使用场景</div>
        </td>
        <td rowspan="1" colSpan="1">
          <div data-type="p">代码示例</div>
        </td>
      </tr>
      <tr height="34px">
        <td rowspan="1" colSpan="1">
          <div data-type="p">path.basename(path[, ext])</div>
        </td>
        <td rowspan="1" colSpan="1">
          <div data-type="p">我们想要获取这个目录路径中最后一部分，也就是文件名</div>
        </td>
        <td rowspan="1" colSpan="1"><pre data-syntax="javascript"><code class="language-javascript">path.basename(&#x27;./ltsn/package.json&#x27;) 
// package.json
path.basename(&#x27;./ltsn/package.json&#x27;, &#x27;.json&#x27;)
// package
</code></pre>
          <div data-type="p"></div>
        </td>
      </tr>
      <tr height="34px">
        <td rowspan="1" colSpan="1">
          <div data-type="p">path.dirname(path)</div>
        </td>
        <td rowspan="1" colSpan="1">
          <div data-type="p">当我们想要拿到当前 JS 文件所在的文件夹名称时</div>
        </td>
        <td rowspan="1" colSpan="1"><pre data-syntax="javascript"><code class="language-javascript">path.dirname(&#x27;/usr/bin/data/package.json&#x27;)
// /usr/bin/data
</code></pre></td>
      </tr>
      <tr height="34px">
        <td rowspan="1" colSpan="1">
          <div data-type="p">path.extname(path)</div>
        </td>
        <td rowspan="1" colSpan="1">
          <div data-type="p">
            当我们想拿到一个文件名的扩展名的时候，也就是文件后缀
          </div>
        </td>
        <td rowspan="1" colSpan="1"><pre data-syntax="javascript"><code class="language-javascript">path.extname(&#x27;about.html&#x27;)
// .html
// 没有扩展名，则返回一个空字符串
</code></pre></td>
      </tr>
      <tr height="34px">
        <td rowspan="1" colSpan="1">
          <div data-type="p">path.normalize(path)</div>
        </td>
        <td rowspan="1" colSpan="1">
          <div data-type="p">当我们想要把一个不规范的路径，处理成符合当前操作系统格式的标准路径字符串时</div>
        </td>
        <td rowspan="1" colSpan="1"><pre data-syntax="javascript"><code class="language-javascript">path.normalize(&#x27;/usr//local/bin//pack.json&#x27;)
// /usr/local/bin/pack.json
</code></pre></td>
      </tr>
      <tr height="34px">
        <td rowspan="1" colSpan="1">
          <div data-type="p">path.join([...paths])</div>
        </td>
        <td rowspan="1" colSpan="1">
          <div data-type="p">当我们想要把几个路径合并起来，拼成一个路径字符串的时候</div>
        </td>
        <td rowspan="1" colSpan="1"><pre data-syntax="javascript"><code class="language-javascript">path.join(&#x27;./a&#x27;, &#x27;b/c&#x27;, &#x27;d/e&#x27;)
// a/b/c/d/e 
</code></pre></td>
      </tr>
      <tr height="34px">
        <td rowspan="1" colSpan="1">
          <div data-type="p">path.resolve([...paths])</div>
        </td>
        <td rowspan="1" colSpan="1">
          <div data-type="p">当我们想要通过当前文件所在的目录，与另外一个目录之间的关系，来拼接绝对路径，或者寻找某一层级的目录时：</div>
        </td>
        <td rowspan="1" colSpan="1"><pre data-syntax="javascript"><code class="language-javascript">// 特点： 相当于不断调用系统的cd命令
path.resolve(&#x27;foo/bar&#x27;,&#x27;/tmp/file/&#x27;,&#x27;..&#x27;)
</code></pre></td>
      </tr>
      <tr height="34px">
        <td rowspan="1" colSpan="1">
          <div data-type="p">path.relative(from, to)</div>
        </td>
        <td rowspan="1" colSpan="1">
          <div data-type="p">当我们想要获取两个目录路径之间的相对关系时
          </div>
        </td>
        <td rowspan="1" colSpan="1"><pre data-syntax="javascript"><code class="language-javascript">path.resolve(&#x27;/usr/bin&#x27;,&#x27;www/a/&#x27;,&#x27;../b&#x27;)
// /usr/bin/www/b
</code></pre></td>
      </tr>
      <tr height="34px">
        <td rowspan="1" colSpan="1">
          <div data-type="p">path.parse(path)</div>
        </td>
        <td rowspan="1" colSpan="1">
          <div data-type="p">将一个路径字符串解析为一个对象，里面分别是根目录，文件所在目录，文件名字、后缀名和名字等</div>
        </td>
        <td rowspan="1" colSpan="1"><pre data-syntax="javascript"><code class="language-javascript">path.parse(&#x27;/usr/bin/www/package.json&#x27;)
/*
 { root: &#x27;/&#x27;,
  dir: &#x27;/usr/bin/www&#x27;,
  base: &#x27;package.json&#x27;,
  ext: &#x27;.json&#x27;,
  name: &#x27;package&#x27; }
*/
</code></pre></td>
      </tr>
      <tr height="34px">
        <td rowspan="1" colSpan="1">
          <div data-type="p">path.format(pathObject)</div>
        </td>
        <td rowspan="1" colSpan="1">
          <div data-type="p">与 path.parse 相反，把一个对象解析为一个路径字符串</div>
        </td>
        <td rowspan="1" colSpan="1"><pre data-syntax="javascript"><code class="language-javascript">path.format({
  dir: &#x27;/usr/bin/www&#x27;,
  base: &#x27;package.json&#x27;,
  ext: &#x27;.json&#x27;,
  name: &#x27;package&#x27; 
})
// /usr/bin/www/package.json
</code></pre></td>
      </tr>
    </tbody>
  </table>
</div>
